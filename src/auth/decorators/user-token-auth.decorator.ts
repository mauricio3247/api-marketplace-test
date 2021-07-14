import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserTokenAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext):string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as string;
  },
);