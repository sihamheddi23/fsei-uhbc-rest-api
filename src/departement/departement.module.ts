import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Departement } from './entities/departement.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([Departement]), JwtModule],
  controllers: [DepartementController],
  providers: [DepartementService],
  exports: [DepartementService],
})
export class DepartementModule {}
