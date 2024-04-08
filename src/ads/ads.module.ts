import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ad } from './entities/ad.entity';

@Module({
  imports: [SequelizeModule.forFeature([Ad])],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
