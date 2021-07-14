import { Test, TestingModule } from '@nestjs/testing';
import { GetProductListService } from './get-product-list.service';

describe('GetProductListService', () => {
  let service: GetProductListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetProductListService],
    }).compile();

    service = module.get<GetProductListService>(GetProductListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
