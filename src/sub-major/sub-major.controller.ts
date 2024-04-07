import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubMajorService } from './sub-major.service';
import { CreateSubMajorDto } from './dto/create-sub-major.dto';
import { UpdateSubMajorDto } from './dto/update-sub-major.dto';
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
  create(@Body() createSubMajorDto: CreateSubMajorDto) {
    return this.subMajorService.create(createSubMajorDto);
  }
  
  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":departement-id")
  findAll(  @Param("departement-id") departement_id: number) {
    return this.subMajorService.findAll(departement_id);
  }
   
  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subMajorService.findOne(+id);
  }
 
  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subMajorService.remove(+id);
  }
}
