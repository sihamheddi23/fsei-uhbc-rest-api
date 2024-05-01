import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { InjectModel } from '@nestjs/sequelize';
import { SubMajorService } from 'src/sub-major/sub-major.service';
import { onUploadFile } from 'src/utils/storage';
import * as fs from 'fs';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule) private readonly scheduleModel: typeof Schedule,
    private readonly subMajorService: SubMajorService
  ) {}

  async create(createScheduleDto: CreateScheduleDto, file: Express.Multer.File): Promise<Schedule> {
    const { sub_major_id } = createScheduleDto
    await this.subMajorService.findOne(sub_major_id);
    
    if(!file) {
      throw new BadRequestException('file not found');
    }

    const schedule = new Schedule({ ...createScheduleDto });
    await schedule.save();
    
    const extensions = ['pdf', 'jpg', 'png', 'jpeg'];
    const filePath = onUploadFile("schedule", schedule._id, file, "schedules", extensions);
    schedule.pdf_url = filePath;
    await schedule.save();

    return schedule;
  }

  async findAll() {
    const schedules = await this.scheduleModel.findAll()
    const new_schedules = [];

    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i]?.dataValues;
      const sub_major = await this.subMajorService.findOne(schedule.sub_major_id);
      new_schedules.push({ ...schedule, sub_major_name: sub_major.name, level: sub_major.level });
    }

    return new_schedules
  }

  async findAllBySubMajor(submajor_id: number) {
    const submajors = await this.subMajorService.findOne(submajor_id);
    return submajors.$get('schedules');
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleModel.findOne({ where: { _id: id } });
    if (!schedule) {
      throw new NotFoundException('schedule not found with this id '+ id);
    }

    return schedule;
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto, file: Express.Multer.File) {
    const filePath = (await this.findOne(id)).pdf_url;
    const { sub_major_id } = updateScheduleDto
    if (sub_major_id) {
      await this.subMajorService.findOne(sub_major_id);
    }
    
    const data: any = { ...updateScheduleDto }
    if (file) {
      const extensions = ['pdf', 'jpg', 'png', 'jpeg'];
      const newfilePath = onUploadFile("schedule", id, file, "schedules", extensions);
      data.pdf_url = newfilePath;
      if (filePath) fs.unlinkSync(filePath);
    }
   
    return await this.scheduleModel.update(data, {
      where: { _id: id },
    });
  }

  async remove(id: number) {
    const filePath = (await this.findOne(id)).pdf_url;
    if (filePath) fs.unlinkSync(filePath);

    return await this.scheduleModel.destroy({ where: { _id: id } });
  }
}
