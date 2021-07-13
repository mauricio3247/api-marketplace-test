import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadAuthInterface } from '../payload-auth.interface';

export const UserPayloadAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext):PayloadAuthInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as PayloadAuthInterface;
  },
);