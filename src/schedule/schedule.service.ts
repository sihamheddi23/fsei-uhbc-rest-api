import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { InjectModel } from '@nestjs/sequelize';
import { SubMajorService } from 'src/sub-major/sub-major.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule) private readonly scheduleModel: typeof Schedule,
    private readonly subMajorService: SubMajorService
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const { sub_major_id } = createScheduleDto
    await this.subMajorService.findOne(sub_major_id);
    return await this.scheduleModel.create(createScheduleDto);
  }

  async findAll(): Promise<Schedule[]> {
    return await this.scheduleModel.findAll();
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

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    await this.findOne(id);
    const { sub_major_id } = updateScheduleDto
    if (sub_major_id) {
      await this.subMajorService.findOne(sub_major_id);
    }
   
    return await this.scheduleModel.update(updateScheduleDto, {
      where: { _id: id },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.scheduleModel.destroy({ where: { _id: id } });
  }
}
