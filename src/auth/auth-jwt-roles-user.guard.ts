import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PayloadAuthInterface } from './payload-auth.interface';
@Injectable()
export class RolesUserGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get<string[]>('roles-user', context.getHandler());
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user:PayloadAuthInterface = request.user;
      return this.matchRoles(roles, user.rol);
    }

    matchRoles (rolesAllowed: string[], userRol: string):boolean {
        return rolesAllowed.find(r => r === userRol) !== undefined
    }

}