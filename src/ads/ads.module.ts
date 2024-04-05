import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';

@Module({
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
