import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Role } from 'src/utils/types';
import { Roles } from 'src/utils/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { RolesGuard } from 'src/auth/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Roles(Role.TEACHER, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('document_pdf'))
  create(
    @Body(ValidationPipe) createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {

    return this.courseService.create(createCourseDto, file);
  }

  @Get('/subject/:id')
  findAll(@Param('id') id: number) {
    return this.courseService.findAll(id);
  }
  
  @Roles(Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/teacher')
  findAllByTeacher(@Req() req) {
    return this.courseService.findAllByTeacher(req.user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

 @Roles(Role.TEACHER, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('document_pdf'))
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCourseDto: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File
 ) {
    return this.courseService.update(+id, updateCourseDto, file);
  }

  @Roles(Role.TEACHER, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
