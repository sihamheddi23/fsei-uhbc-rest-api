import { Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ad) private readonly adModel: typeof Ad) {}
  async create(createAdDto: CreateAdDto) : Promise<Ad> {
    return await this.adModel.create(createAdDto);
  }

  async findAll(limit: number): Promise<Ad[]> {
    return await this.adModel.findAll({ limit });
  }

  async findAllNews(limit: number): Promise<Ad[]> {
    return await this.adModel.findAll({ where: { type: "news" }, limit});
  }
  
  async findAllFaculty(limit: number) : Promise<Ad[]> {
    return await this.adModel.findAll({ where: { type: "faculty" }, limit});
  }
  
  async findAllByDepartementID(limit: number, departement_id: number) : Promise<Ad[]> {
    return await this.adModel.findAll({ where: { type: "departement", departement_id }, limit });
  }

  async findOne(id: number): Promise<Ad> {
    return await this.adModel.findOne({ where: { _id: id } });
  }

  async update(id: number, updateAdDto: UpdateAdDto) {
    return await this.adModel.update(updateAdDto, { where: { _id: id } });
  }

  async remove(id: number) {
    return await this.adModel.destroy({ where: { _id: id } });
  }
}
