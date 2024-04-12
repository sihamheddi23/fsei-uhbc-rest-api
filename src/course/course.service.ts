import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './entities/course.entity';
import { SubjectService } from 'src/subject/subject.service';
import * as fs from 'fs';
import { onUploadFile } from 'src/utils/storage';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private readonly courseModel: typeof Course,
    private readonly subjectService: SubjectService
  ) {}
  async create(createCourseDto: CreateCourseDto, file: Express.Multer.File): Promise<Course> {
    const { subject_id } = createCourseDto;
    await this.subjectService.findOne(subject_id);
    const course = await new Course({ ...createCourseDto });
    const filePath = onUploadFile("course", course._id, file, "courses");
    course.pdf_url = filePath;
    await course.save();
    
    return course;
  }

  async findAll(subject_id: number): Promise<Course[]> {
    await this.subjectService.findOne(subject_id);
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

  async update(id: number, updateCourseDto: UpdateCourseDto, file?: Express.Multer.File) {
    const filePath = (await this.findOne(id)).pdf_url;

    const { subject_id } = updateCourseDto;
    if (subject_id) await this.subjectService.findOne(subject_id);

    const data: any = { ...updateCourseDto };
    if (file) {
      data.pdf_url = file.path;
      if (filePath) fs.unlinkSync(filePath);
    }

    return await this.courseModel.update(data, {
      where: { _id: id },
    });
  }

  async remove(id: number) {
    const filePath = (await this.findOne(id)).pdf_url;
    if (filePath) fs.unlinkSync(filePath);
    
    return await this.courseModel.destroy({ where: { _id: id } });
  }
}
