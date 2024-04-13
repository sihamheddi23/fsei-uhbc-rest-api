import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Roles } from 'src/utils/decorators';
import { Role } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { RolesGuard } from 'src/auth/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('document_pdf'))
  create(@Body(ValidationPipe) createScheduleDto: CreateScheduleDto, @UploadedFile() file: Express.Multer.File) {
    return this.scheduleService.create(createScheduleDto, file);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Get('sub-major/:id')
  findAllBySubMajor(@Param('id') id: number) {
    return this.scheduleService.findAllBySubMajor(id);
  }

  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('document_pdf'))
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateScheduleDto: UpdateScheduleDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.scheduleService.update(+id, updateScheduleDto, file);
  }

  @Roles(Role.ADMIN, Role.HEAD_DEPARTEMENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
