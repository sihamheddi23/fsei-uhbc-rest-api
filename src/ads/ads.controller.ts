import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Roles } from 'src/utils/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { RolesGuard } from 'src/auth/role.guard';
import { Role } from 'src/utils/types';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Post()
  create(@Body(ValidationPipe) createAdDto: CreateAdDto) {
    return this.adsService.create(createAdDto);
  }

  @Get()
  findAll(@Query('limit') limit: number) {
    return this.adsService.findAll(limit);
  }

  @Get('/:id/')
  findOne(@Param('id') id: number) {
    console.log(id);
    return this.adsService.findOne(+id);
  }

  @Get('/all/:type/:departement_id?')
  findAllByType(@Query('limit') limit: number, @Param('type') type: string, @Param('departement_id') departement_id: number) {
    console.log(type);
    return this.adsService.findAllByType(limit, type, departement_id);
  }
  
  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateAdDto: UpdateAdDto) {
    return this.adsService.update(+id, updateAdDto);
  }

  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adsService.remove(+id);
  }
}
