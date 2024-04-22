import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Departement } from './entities/departement.entity';

@Injectable()
export class DepartementService {
  constructor( @InjectModel(Departement)
    private readonly departementModel: typeof Departement,) {}
  async create(createDepartementDto: CreateDepartementDto) {
    return await this.departementModel.create(createDepartementDto);
  }

 async findAll(limit: number=10) {
    return await this.departementModel.findAll({limit});
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
