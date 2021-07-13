import { CustomDecorator, SetMetadata } from '@nestjs/common';
export const RolesUserAuth = (...roles: string[]): CustomDecorator<string>=> SetMetadata('roles-user', roles);