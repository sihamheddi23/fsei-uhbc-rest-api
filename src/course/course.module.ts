import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './entities/course.entity';

@Module({
  imports: [SequelizeModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
