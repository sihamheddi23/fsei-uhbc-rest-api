import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { InjectModel } from '@nestjs/sequelize';
import { DepartementService } from 'src/departement/departement.service';
import { SubMajorService } from 'src/sub-major/sub-major.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule) private readonly scheduleModel: typeof Schedule,
    private readonly subMajorService: SubMajorService
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return await this.scheduleModel.create(createScheduleDto);
  }

  async findAll(): Promise<Schedule[]> {
    return await this.scheduleModel.findAll();
  }

  async findAllByDepartementID(departement_id: number) {
    const schedules = []
    const submajors = await  this.subMajorService.findAll(departement_id);
    for (let i = 0; i < submajors.length; i++) {
      const submajor = submajors[i];
      const schedulesBySubMajor = await this.scheduleModel.findAll({
        where: {
          sub_major_id: submajor._id
        }
      });

      schedules.push(...schedulesBySubMajor)
    }

    return schedules;
  }

  async findOne(id: number):Promise<Schedule> {
    return await this.scheduleModel.findOne({ where: { _id: id } });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return await this.scheduleModel.update(updateScheduleDto, {
      where: { _id: id },
    });
  }

  async remove(id: number) {
    return await this.scheduleModel.destroy({ where: { _id: id } });
  }
}
