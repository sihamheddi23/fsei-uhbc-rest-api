import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubMajorDto } from './dto/create-sub-major.dto';
import { UpdateSubMajorDto } from './dto/update-sub-major.dto';
import { SubMajor } from './entities/sub-major.entity';
import { InjectModel } from '@nestjs/sequelize';
import { DepartementService } from 'src/departement/departement.service';

@Injectable()
export class SubMajorService {
  constructor(
    @InjectModel(SubMajor) private readonly subMajorModel: typeof SubMajor,
    private readonly departementService: DepartementService,
  ) {}

  async create(createSubMajorDto: CreateSubMajorDto) {
    const { levels } = createSubMajorDto;
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      await this.subMajorModel.create({ ...createSubMajorDto, level });
    }
    return {
      status: 201,
      message: 'SubMajor created successfully',
    };
  }

  async findAll(departement_id?: number,limit: number = 10): Promise<SubMajor[]> {
    let subMajors = [];
    if (!departement_id) {
      subMajors = await this.subMajorModel.findAll({ limit });
    }
    else {
      subMajors = await this.subMajorModel.findAll({
        where: { departement_id },
        limit,
      });
    }
    
    for (let i = 0; i < subMajors.length; i++) {
      const subMajor = subMajors[i]?.dataValues;
      const departement = await this.departementService.findOne(subMajor.departement_id);
      subMajor.departement_name = departement.name;
    }

    return subMajors;
  }

  async findOne(id: number): Promise<SubMajor> {
    const subMajor = await this.subMajorModel.findOne({ where: { _id: id } });
    if (!subMajor) {
      throw new NotFoundException(`subMajor not found with this id ${id}`);
    }
    return subMajor;
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.subMajorModel.destroy({ where: { _id: id } });
  }
}
