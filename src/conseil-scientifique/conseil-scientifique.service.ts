import { Injectable } from '@nestjs/common';
import { CreateConseilScientifiqueDto } from './dto/create-conseil-scientifique.dto';
import { UpdateConseilScientifiqueDto } from './dto/update-conseil-scientifique.dto';

@Injectable()
export class ConseilScientifiqueService {
  create(createConseilScientifiqueDto: CreateConseilScientifiqueDto) {
    return 'This action adds a new conseilScientifique';
  }

  findAll() {
    return `This action returns all conseilScientifique`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conseilScientifique`;
  }

  update(id: number, updateConseilScientifiqueDto: UpdateConseilScientifiqueDto) {
    return `This action updates a #${id} conseilScientifique`;
  }

  remove(id: number) {
    return `This action removes a #${id} conseilScientifique`;
  }
}
