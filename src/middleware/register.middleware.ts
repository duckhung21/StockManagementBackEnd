import { Injectable, NestMiddleware, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Reflector } from '@nestjs/core';

import * as jwt_decode from 'jwt-decode';
var jwt = require('jsonwebtoken');
import { jwtConstants } from '../auth/constant'


@Injectable()
export class RegisterMiddleware implements NestMiddleware {
    constructor(private readonly _reflector: Reflector) {

    }
    use(req: Request, res: Response, next: Function) {
        console.log('Request...');
        // console.log(req.headers.authorization)

        var token = req.headers.authorization
        var newToken = token.substring(7, token.length)
        var _decoded = jwt_decode(newToken)

        // console.log(_decoded.role)
        var verifyToken = jwt.verify(newToken, jwtConstants.secret)
        console.log(verifyToken.role)

        const role = verifyToken.role
        if (role !== "Admin") {
            throw new HttpException("you do not have permission", HttpStatus.UNAUTHORIZED)
            // return res.status(401).send("you do not have enough permission")
        }
        next();
    }
}
