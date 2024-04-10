import { Test, TestingModule } from '@nestjs/testing';
import { ConseilScientifiqueService } from './conseil-scientifique.service';

describe('ConseilScientifiqueService', () => {
  let service: ConseilScientifiqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConseilScientifiqueService],
    }).compile();

    service = module.get<ConseilScientifiqueService>(ConseilScientifiqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
