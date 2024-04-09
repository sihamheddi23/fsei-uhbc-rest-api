import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AdsType } from 'src/utils/types';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ad) private readonly adModel: typeof Ad) {}
  async create(createAdDto: CreateAdDto): Promise<Ad> {
    const { type } = createAdDto;
    if (type === AdsType.Departement) {
      if(!createAdDto.departement_id) {
        throw new BadRequestException('Departement ID is required');
      }
    }
    
    if(type === AdsType.News) {
      if(!createAdDto.document_url) {
        throw new BadRequestException('Document URL is required');
      }
    }

    if(createAdDto.departement_id && type != AdsType.Departement) {
        throw new BadRequestException('we dont need Departement ID');
    }

    return await this.adModel.create(createAdDto);
  }

  async findAll(limit: number): Promise<Ad[]> {
    return await this.adModel.findAll({ limit });
  }

  async findAllByType(limit: number, type: string, departement_id: number): Promise<Ad[]> {
    let query: any = { type: type.toUpperCase() }
    if (query.type === AdsType.Departement) {
      console.log("departement_id",departement_id);
      if(!departement_id) {
        throw new BadRequestException('Departement ID is required');
      }
      query.departement_id = departement_id 
    }

    return await this.adModel.findAll({ where: query, limit, order: [['createdAt', 'DESC']] });
  }
 

  async findOne(id: number): Promise<Ad> {
    return await this.adModel.findOne({ where: { _id: id } });
  }

  async update(id: number, updateAdDto: UpdateAdDto) {
    const { type } = updateAdDto;
    if (type === AdsType.Departement) {
      if(!updateAdDto.departement_id) {
        throw new BadRequestException('Departement ID is required');
      }
    }

    if(type === AdsType.News) {
      if(!updateAdDto.document_url) {
        throw new BadRequestException('Document URL is required');
      }
    }

    return await this.adModel.update(updateAdDto, { where: { _id: id } });
  }

  async remove(id: number) {
    return await this.adModel.destroy({ where: { _id: id } });
  }
}
