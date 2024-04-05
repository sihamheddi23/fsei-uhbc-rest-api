import { Module } from '@nestjs/common';
import { SubMajorService } from './sub-major.service';
import { SubMajorController } from './sub-major.controller';

@Module({
  controllers: [SubMajorController],
  providers: [SubMajorService],
})
export class SubMajorModule {}
