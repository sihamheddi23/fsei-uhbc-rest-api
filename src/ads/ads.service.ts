import { Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Injectable()
export class AdsService {
  create(createAdDto: CreateAdDto) {
    return 'This action adds a new ad';
  }

  findAll() {
    return `This action returns all ads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ad`;
  }

  update(id: number, updateAdDto: UpdateAdDto) {
    return `This action updates a #${id} ad`;
  }

  remove(id: number) {
    return `This action removes a #${id} ad`;
  }
}
