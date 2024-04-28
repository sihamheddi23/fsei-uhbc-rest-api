import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Departement } from './entities/departement.entity';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class DepartementService {
  constructor( @InjectModel(Departement)
  private readonly departementModel: typeof Departement,
  private readonly TeacherService: TeacherService) { }
  async create(createDepartementDto: CreateDepartementDto) {
    return await this.departementModel.create(createDepartementDto);
  }

  async findAll(limit: number = 10) {
    const departements = await this.departementModel.findAll({ limit });
    const new_departements = [];
    
    for (let i = 0; i < departements.length; i++) {
      const departement: any = departements[i]?.dataValues;
      const teacher = await this.TeacherService.findOne(departement.head_departement_id);
      departement.head_departement_name = teacher.first_name + " " + teacher.last_name;
      new_departements.push(departement);
    }

    return new_departements;
  }

  async findOne(id: number): Promise<Departement> {
    const departement = await this.departementModel.findOne({ where: { _id: id } });
    if (!departement) {
      throw new NotFoundException('departement not found with this id');
    }
    return departement;
  }

  async update(id: number, updateDepartementDto: UpdateDepartementDto) {
    await this.findOne(id);
    return await this.departementModel.update(updateDepartementDto, {
      where: { _id: id },
      returning: true,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.departementModel.destroy({ where: { _id: id } });
  }
}
