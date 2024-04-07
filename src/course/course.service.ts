import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private readonly courseModel: typeof Course,
  ) {}
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll(subject_id: number): Promise<Course[]> {
    return await this.courseModel.findAll({
      where: { subject_id },
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseModel.findOne({ where: { _id: id } });
    if (!course) {
      throw new NotFoundException('course not found with this id');
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id);
    return await this.courseModel.update(updateCourseDto, {
      where: { _id: id },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.courseModel.destroy({ where: { _id: id } });
  }
}
