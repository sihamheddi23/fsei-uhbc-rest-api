import { Test, TestingModule } from '@nestjs/testing';
import { SubMajorService } from './sub-major.service';

describe('SubMajorService', () => {
  let service: SubMajorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubMajorService],
    }).compile();

    service = module.get<SubMajorService>(SubMajorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
