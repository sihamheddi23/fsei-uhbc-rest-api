import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { Roles } from 'src/utils/decorators';
import { Role } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('departement')
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Post()
  create(@Body(ValidationPipe) createDepartementDto: CreateDepartementDto) {
    return this.departementService.create(createDepartementDto);
  }

  @Get()
  findAll(@Query('limit') limit: number) {
    return this.departementService.findAll(limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departementService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateDepartementDto: UpdateDepartementDto) {
    return this.departementService.update(+id, updateDepartementDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departementService.remove(+id);
  }
}
