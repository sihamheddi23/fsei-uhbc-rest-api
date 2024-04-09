import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Role } from 'src/utils/types';
import { Roles } from 'src/utils/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
   
  @Roles(Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Post()
  create(@Body(ValidationPipe) createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get("/subject/:id")
  findAll(@Param("id") id: number) {
    return this.courseService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }
  
  @Roles(Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }
  
  @Roles(Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
