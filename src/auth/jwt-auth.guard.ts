import { Injectable, ExecutionContext, CanActivate, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import * as jwt_decode from 'jwt-decode';

 
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt')
{
    constructor(private readonly _reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext): boolean {
        const passportActive = super.canActivate(context);
        if (!passportActive) {
            throw new HttpException(
                'You do not have permission (Roles)',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const roles = this._reflector.get<string>(
            'roles',
            context.getHandler(),
        );

        console.log(roles)

        // if (!roles || roles.length === 0) {
        //     return true;
        // }

        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization

        var newToken = token.substring(7, token.length)
        var decoded1 = jwt_decode(newToken)
        console.log(decoded1)

        // const user: InstanceType<User> = request.user;

        // // i want to get the role from JWT in here

        // const hasRole = () => roles.indexOf(user.role) >= 0;

        // if (user && user.role && hasRole()) {
        //     return true;
        // }

        // throw new HttpException(
        //     'You do not have permission (Roles)',
        //     HttpStatus.UNAUTHORIZED,
        // );

        return false
    }

    // handleRequest(err, user, info) {
    //     if (err || !user) {
    //       throw err || new UnauthorizedException();
    //     }
    //     return user;
    //   }
}
