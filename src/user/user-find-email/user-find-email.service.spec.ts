import { Test, TestingModule } from '@nestjs/testing';
import { UserFindEmailService } from './user-find-email.service';

describe('UserFindEmailService', () => {
  let service: UserFindEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFindEmailService],
    }).compile();

    service = module.get<UserFindEmailService>(UserFindEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
