import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './entities/course.entity';
import { SubjectService } from 'src/subject/subject.service';
import * as fs from 'fs';
import { onUploadFile } from 'src/utils/storage';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private readonly courseModel: typeof Course,
    private readonly subjectService: SubjectService,
    private readonly teacherService: TeacherService
  ) {}
  async create(createCourseDto: CreateCourseDto, file: Express.Multer.File): Promise<Course> {
    const { subject_id } = createCourseDto;
    await this.subjectService.findOne(subject_id);

    const course = await new Course({ ...createCourseDto });
    await course.save();

    let extensions = ['pdf'];
    const filePath = onUploadFile("course", course._id, file, "courses", extensions);
    course.pdf_url = filePath;
    await course.save();
    
    return course;
  }

  async findAllByTeacher(user_id: number) {
    const teacher = await this.teacherService.findByUserId(user_id)
    const subjects: any = await teacher.$get('subjects');
    
    const courses = [];
    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i].dataValues;
      const coursesBySubject: any = await this.findAll(subject._id);
      for (let j = 0; j < coursesBySubject.length; j++) {
        const course = coursesBySubject[j].dataValues;
        courses.push({...course, subject_name: subject.name});
      }
    }

    return courses
  }

  async findAll(subject_id: number): Promise<Course[]> {
    await this.subjectService.findOne(subject_id);
    const courses = await this.courseModel.findAll({
      where: { subject_id },
    })
    return courses;
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
      let extensions = ['pdf'];
      const newfilePath = onUploadFile("course", id, file, "courses", extensions);
      data.pdf_url = newfilePath;
      
      if (filePath) fs.unlinkSync(filePath);
    }
    
    return await this.courseModel.update(data, {
      where: { _id: id },
    });
  }

  async remove(id: number) {
    const filePath = (await this.findOne(id)).pdf_url;
    if(filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
    
    return await this.courseModel.destroy({ where: { _id: id } });
  }
}
