import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './entities/course.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SubjectModule } from 'src/subject/subject.module';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [TeacherModule, SubjectModule, AuthModule, JwtModule, SequelizeModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
