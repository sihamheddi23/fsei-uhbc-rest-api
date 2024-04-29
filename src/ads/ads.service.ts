import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Ad } from './entities/ad.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AdsType } from 'src/utils/types';
import { onUploadFile } from 'src/utils/storage';
import * as fs from "fs"
import { DepartementService } from 'src/departement/departement.service';

@Injectable()
export class AdsService {

  constructor(@InjectModel(Ad) private readonly adModel: typeof Ad,
    private readonly departementService: DepartementService) { }
  
  async create(createAdDto: CreateAdDto, file: Express.Multer.File): Promise<Ad> {
    const { type } = createAdDto;
    let extensions = ['jpg', 'png', 'jpeg', 'pdf'];
    if (type === AdsType.Departement) {
      if(!createAdDto.departement_id) {
        throw new BadRequestException('Departement ID is required');
      }
    }
    
    if (type === AdsType.News) {
      extensions = ['jpg', 'png', 'jpeg'];
      if(!file) {
        throw new BadRequestException('Document URL is required');
      }
    }

    if(createAdDto.departement_id && type != AdsType.Departement) {
        throw new BadRequestException('we dont need Departement ID');
    }

    const transaction = await this.adModel.sequelize.transaction();
    try {
      const { departement_id } = createAdDto
      let id;
      if (type === AdsType.Departement) {
        id = parseInt(departement_id);
      }
      const ad: any = await new Ad({ ...createAdDto, departement_id: id });
      await ad.save({ transaction });
      if (file) {
        const filePath = onUploadFile("ad", ad._id, file, "ads", extensions);
        ad.document_url = filePath;
        await ad.save({ transaction });
      }
      await transaction.commit();

      return ad;
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }

  async findAll(limit: number): Promise<Ad[]> {
    const ads = await this.adModel.findAll({ limit });
    const new_ads = []
    
    for (let i = 0; i < ads.length; i++) {
      const ad = ads[i]?.dataValues;
      
      if (ad.type === "DEPARTEMENT") {
        const departement: any = await this.departementService.findOne(ad.departement_id);
        new_ads.push({ ...ad, departement_name: departement.name })
      } else {
        new_ads.push(ad)
      }
    }

    return new_ads;
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
    const ad = await this.adModel.findOne({ where: { _id: id } });
    if (!ad) throw new BadRequestException('ad not found');
    return ad;
  }

  async update(id: number, updateAdDto: UpdateAdDto, file: Express.Multer.File) {
    const filePath = (await this.findOne(id)).document_url;
    let extensions = ['jpg', 'png', 'jpeg', 'pdf'];
    const { type } = updateAdDto;
    
    if (type === AdsType.Departement) {
      if(!updateAdDto.departement_id) {
        throw new BadRequestException('Departement ID is required');
      }
    }

    if (type === AdsType.News) {
      extensions = ['jpg', 'png', 'jpeg'];
      if(!file) {
        throw new BadRequestException('Document URL is required');
      }
    }

    const data:any = {...updateAdDto} 

    if (file) {
      const newfilePath = onUploadFile("ad", id, file, "ads",extensions);
      data.document_url = newfilePath;
      
      if (filePath) fs.unlinkSync(filePath);
    }

    return await this.adModel.update(data, { where: { _id: id } });
  }

  async remove(id: number) {
    // const filePath = (await this.findOne(id)).document_url;
    // if (filePath) fs.unlinkSync(filePath);

    return await this.adModel.destroy({ where: { _id: id } });
  }
}
