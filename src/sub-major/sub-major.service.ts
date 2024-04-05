import { Injectable } from '@nestjs/common';
import { CreateSubMajorDto } from './dto/create-sub-major.dto';
import { UpdateSubMajorDto } from './dto/update-sub-major.dto';
import { SubMajor } from './entities/sub-major.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SubMajorService {
  constructor(@InjectModel(SubMajor) private readonly subMajorModel: typeof SubMajor) {}

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

  async findAll() : Promise<SubMajor[]> {
    return await this.subMajorModel.findAll();
  }

  findOne(id: number) {
    
    return `This action returns a #${id} subMajor`;
  }

  update(id: number, updateSubMajorDto: UpdateSubMajorDto) {
    return `This action updates a #${id} subMajor`;
  }

  remove(id: number) {
    return `This action removes a #${id} subMajor`;
  }
}
