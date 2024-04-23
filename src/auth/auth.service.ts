import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInputDto } from './dto/loginInput.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/auth.entity';
import { Op } from 'sequelize';
import { comparePassword, encryptPassword } from 'src/utils/hashing';
import { CreateUserDto } from './dto/create-user.dto';
import { SessionToken } from './entities/session.entity';
import { UpdateUserDto } from './dto/update-auth.dto';
import { Role } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(SessionToken)
    private readonly sessionModel: typeof SessionToken,
    private jwtService: JwtService,
  ) { }
  
  async getUsers(limit: number=10): Promise<User[]> {
    const users = await this.userModel.findAll({ attributes: { exclude: ['password'] }, limit } );
    return users;
  }
  
  async getHeadDepartements() {
    const teachers = []
    const users = await this.userModel.findAll({ attributes: { exclude: ['password'] }, where: { role: Role.HEAD_DEPARTEMENT } });
    for (let i = 0; i < users.length; i++) {
      const teacher = (await users[i].$get('teacher'))?.get()
      if(teacher) teachers.push(teacher)
    }

    return teachers;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneUserByID(id);
    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = await encryptPassword(password);
    }
    return await this.userModel.update(updateUserDto, { where: { _id: id } });
  }

  async deleteUser(id: number) {
    await this.findOneUserByID(id);
    return await this.userModel.destroy({ where: { _id: id } });
  }

  async unvalidateSession(id: string){
    return await this.sessionModel.update({ isValid: false }, { where: { _id: id } });
  }
  
  async findOneUserByID(id: number): Promise<User> {
    const user = await this.userModel.findOne({ where: { _id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async findUserBySessionId(id: string): Promise<User> {
    const session = await this.sessionModel.findOne({ where: { _id: id } });
    
    if (!session || !session.isValid) {
      throw new UnauthorizedException('unauthorized acces you need to login');
    }

    return this.findOneUserByID(session.userID);
  }

  async findOneByUsernameOrEmail(input: string | {username: string, email: string}): Promise<User> {
    let query;
    if (typeof input === 'string') {
       query = [{ username: input }, { email: input }] 
    }
    else {
      query =  [{ username: input.username }, { email: input.email }] 
    }

    return await this.userModel.findOne({
      where: { [Op.or]: query },
    });
  }

  async login(loginDto: LoginInputDto,userAgent:string): Promise<{ token: string, role: string }> {
    const { usernameOrEmail, password } = loginDto;
    const user = await this.findOneByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    const isMatchPassowrd = await comparePassword(password,user.password);
    if (!isMatchPassowrd) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const session = await this.sessionModel.create({ userID: user._id, isValid: true, userAgent, createdAt: new Date() });

    const token = this.jwtService.sign({ id: session._id, createdAt: session.createdAt });

    return { token, role: user.role };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    const user = await this.findOneByUsernameOrEmail({username, email});
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const encryptedPassword = await encryptPassword(password);
    const newUser = await this.userModel.create({ ...createUserDto, password: encryptedPassword });
    
    return newUser;
  }
}
