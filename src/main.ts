import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminUserCreateService } from './user/admin-user-create/admin-user-create.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const adminUserCreate = app.get(AdminUserCreateService);
  await adminUserCreate.adminCreate();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
