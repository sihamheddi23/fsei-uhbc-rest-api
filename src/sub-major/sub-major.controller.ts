import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { SubMajorService } from './sub-major.service';
import { CreateSubMajorDto } from './dto/create-sub-major.dto';
import { Roles } from 'src/utils/decorators';
import { Role } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('sub-major')
export class SubMajorController {
  constructor(private readonly subMajorService: SubMajorService) {}
  
  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body(ValidationPipe) createSubMajorDto: CreateSubMajorDto) {
    return this.subMajorService.create(createSubMajorDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subMajorService.findOne(+id);
  }
  
  @Get()
  findAll(@Query("limit") limit: number) {
    return this.subMajorService.findAll(limit);
  }

  @Get("/departement/:id")
  findAllDeapartement(@Param("id") departement_id: number, @Query("limit") limit: number) {
    return this.subMajorService.findAll(departement_id, limit);
  }
   
  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subMajorService.remove(+id);
  }
}
