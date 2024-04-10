import { Module } from '@nestjs/common';
import { ConseilScientifiqueService } from './conseil-scientifique.service';
import { ConseilScientifiqueController } from './conseil-scientifique.controller';

@Module({
  controllers: [ConseilScientifiqueController],
  providers: [ConseilScientifiqueService],
})
export class ConseilScientifiqueModule {}
