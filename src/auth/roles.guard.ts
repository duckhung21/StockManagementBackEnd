import { Injectable, CanActivate, ExecutionContext, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { promises } from 'fs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // console.log(request.body)
    const user = request.body;
    // console.log(user.role)
    return this.matchRoles(roles, user.role);
  }

  matchRoles(roles, userRole): boolean{
      if(roles !== userRole){
          return false
      }
      return true
  }
}
