import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Roles } from 'src/utils/decorators';
import { Role } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
   
  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }
  
  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
