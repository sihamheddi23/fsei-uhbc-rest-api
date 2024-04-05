import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  create(@Body() createAdDto: CreateAdDto) {
    return this.adsService.create(createAdDto);
  }

  @Get()
  findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.adsService.update(+id, updateAdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adsService.remove(+id);
  }
}
