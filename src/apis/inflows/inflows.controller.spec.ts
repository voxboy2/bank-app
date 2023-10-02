import { Test, TestingModule } from '@nestjs/testing';
import { InflowsController } from './inflows.controller';
import { InflowsService } from './inflows.service';

describe('InflowsController', () => {
  let controller: InflowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InflowsController],
      providers: [InflowsService],
    }).compile();

    controller = module.get<InflowsController>(InflowsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
