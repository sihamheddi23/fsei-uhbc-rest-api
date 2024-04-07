import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DepartementService } from 'src/departement/departement.service';
import { SubMajorService } from 'src/sub-major/sub-major.service';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject) private readonly subjectModel: typeof Subject,
    private readonly departementService: DepartementService,
    private readonly subMajorService: SubMajorService,
  ) {}
  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return await this.subjectModel.create(createSubjectDto);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectModel.findAll();
  }

  async findAllByDepartementID(departement_id: number) {
    const modules = []
    const departement = await this.departementService.findOne(departement_id);
    const majors = await this.subMajorService.findAll(departement._id);
    for (let i = 0; i < majors.length; i++) {
      const subjects = majors[i];
      modules.push(subjects);
    }
    
    return modules
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectModel.findOne({ where: { _id: id } });
    if (!subject) {
      throw new NotFoundException('subject not found with this id');
    }

    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return await this.subjectModel.update(updateSubjectDto, { where: { _id: id } });
  }

  async remove(id: number) {
    return await this.subjectModel.destroy({ where: { _id: id } });
  }
}
