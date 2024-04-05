import { Test, TestingModule } from '@nestjs/testing';
import { SubMajorController } from './sub-major.controller';
import { SubMajorService } from './sub-major.service';

describe('SubMajorController', () => {
  let controller: SubMajorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubMajorController],
      providers: [SubMajorService],
    }).compile();

    controller = module.get<SubMajorController>(SubMajorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
