import { Test, TestingModule } from '@nestjs/testing';
import { ConseilScientifiqueController } from './conseil-scientifique.controller';
import { ConseilScientifiqueService } from './conseil-scientifique.service';

describe('ConseilScientifiqueController', () => {
  let controller: ConseilScientifiqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConseilScientifiqueController],
      providers: [ConseilScientifiqueService],
    }).compile();

    controller = module.get<ConseilScientifiqueController>(ConseilScientifiqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
