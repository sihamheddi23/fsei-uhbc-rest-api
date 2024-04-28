import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ad } from './entities/ad.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { DepartementModule } from 'src/departement/departement.module';

@Module({
  imports: [DepartementModule, SequelizeModule.forFeature([Ad]), AuthModule, JwtModule],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
