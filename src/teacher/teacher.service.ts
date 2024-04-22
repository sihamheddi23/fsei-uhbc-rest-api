import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './entities/teacher.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher)
    private readonly teacherModel: typeof Teacher,
    private readonly authService: AuthService
  ) { }
  
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {    
    const { user_id } = createTeacherDto;
    await this.authService.findOneUserByID(user_id);
    
    return await this.teacherModel.create(createTeacherDto);
  }

  async findAll() {
    const data = []
    const teachers:any = await this.teacherModel.findAll();
    for (const teacher of teachers) {
      const user = await this.authService.findOneUserByID(teacher.user_id)
      data.push({...(teacher.dataValues), username: user.dataValues['username']})
    }

    return data
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherModel.findOne({ where: { _id: id } })
    if (!teacher) {
      throw new NotFoundException('teacher not found with this id');
    }

    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    await this.findOne(id);
    return await this.teacherModel.update(updateTeacherDto, { where: { _id: id } });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.teacherModel.destroy({ where: { _id: id } });
  }
}
