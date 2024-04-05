import { Injectable } from '@nestjs/common';
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

  async findAll() : Promise<Teacher[]> {
    return await this.teacherModel.findAll();
  }

  async findOne(id: number) : Promise<Teacher> {
    return await this.teacherModel.findOne({ where: { _id: id } });
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
