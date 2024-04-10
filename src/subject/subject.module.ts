import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './entities/subject.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { SubMajorModule } from 'src/sub-major/sub-major.module';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    TeacherModule,
    SubMajorModule,
    SequelizeModule.forFeature([Subject]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
  
export class SubjectModule {}
