import { Test, TestingModule } from '@nestjs/testing';
import { JwtSecureService } from './jwt-secure.service';

describe('JwtSecureService', () => {
  let service: JwtSecureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtSecureService],
    }).compile();

    service = module.get<JwtSecureService>(JwtSecureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
