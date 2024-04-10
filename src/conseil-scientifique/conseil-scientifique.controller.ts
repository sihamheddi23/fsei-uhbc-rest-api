import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConseilScientifiqueService } from './conseil-scientifique.service';
import { CreateConseilScientifiqueDto } from './dto/create-conseil-scientifique.dto';
import { UpdateConseilScientifiqueDto } from './dto/update-conseil-scientifique.dto';

@Controller('conseil-scientifique')
export class ConseilScientifiqueController {
  constructor(private readonly conseilScientifiqueService: ConseilScientifiqueService) {}

  @Post()
  create(@Body() createConseilScientifiqueDto: CreateConseilScientifiqueDto) {
    return this.conseilScientifiqueService.create(createConseilScientifiqueDto);
  }

  @Get()
  findAll() {
    return this.conseilScientifiqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conseilScientifiqueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConseilScientifiqueDto: UpdateConseilScientifiqueDto) {
    return this.conseilScientifiqueService.update(+id, updateConseilScientifiqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conseilScientifiqueService.remove(+id);
  }
}
