import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SubMajorService } from 'src/sub-major/sub-major.service';
import { Subject } from './entities/subject.entity';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject) private readonly subjectModel: typeof Subject,
    private readonly teacherService: TeacherService,
    private readonly subMajorService: SubMajorService,
  ) {}
  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const { sub_major_id, teacher_id } = createSubjectDto;
    await this.subMajorService.findOne(sub_major_id);
    await this.teacherService.findOne(teacher_id);

    return await this.subjectModel.create(createSubjectDto);
  }

  async findAll() {
    const subjects = await this.subjectModel.findAll();
    for (let i = 0; i < subjects.length; i++) {
      const subject: any = subjects[i]?.dataValues;
      const sub_major = await this.subMajorService.findOne(subject.sub_major_id);
      const teacher = await this.teacherService.findOne(subject.teacher_id);

      subject.sub_major_name = sub_major.name;
      subject.level = sub_major.level;
      subject.full_name_teacher = teacher.first_name + " " + teacher.last_name;
    }

    return subjects;
  }

  async findAllBySubMajor(id: number) {
    const submajors = await this.subMajorService.findOne(id);
    return submajors.$get('subjects');
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectModel.findOne({ where: { _id: id } });
    if (!subject) {
      throw new NotFoundException('subject not found with this id');
    }

    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);
    
    const { sub_major_id, teacher_id } = updateSubjectDto;
    if(sub_major_id) await this.subMajorService.findOne(sub_major_id);
    if (teacher_id) await this.teacherService.findOne(teacher_id);
    
    return await this.subjectModel.update(updateSubjectDto, { where: { _id: id } });
  }

  async remove(id: number) {
    return await this.subjectModel.destroy({ where: { _id: id } });
  }
}
