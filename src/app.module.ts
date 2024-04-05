import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DepartementModule } from './departement/departement.module';
import { TeacherModule } from './teacher/teacher.module';
import { ScheduleModule } from './schedule/schedule.module';
import { CourseModule } from './course/course.module';
import { ModuleModule } from './module/module.module';
import { AdsModule } from './ads/ads.module';
import { SubMajorModule } from './sub-major/sub-major.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
  }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    DepartementModule,
    TeacherModule,
    ScheduleModule,
    CourseModule,
    ModuleModule,
    AdsModule,
    SubMajorModule],
})
export class AppModule {}
