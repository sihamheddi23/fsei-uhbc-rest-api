import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './entities/subject.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { DepartementModule } from 'src/departement/departement.module';
import { SubMajorModule } from 'src/sub-major/sub-major.module';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    DepartementModule,
    SubMajorModule,
    SequelizeModule.forFeature([Subject]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
})
  
export class SubjectModule {}
