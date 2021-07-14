import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserCreateService } from './admin-user-create.service';

describe('AdminUserCreateService', () => {
  let service: AdminUserCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminUserCreateService],
    }).compile();

    service = module.get<AdminUserCreateService>(AdminUserCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
