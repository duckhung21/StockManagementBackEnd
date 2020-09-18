import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../Services/user.service'
import { Error } from "mongoose";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        // @InjectModel('User') private readonly user: Model<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(username: string, password: string) {
        var jsonWebToken;
        const loginResult = await this.userService.findByLogin(username, password);
        if(loginResult.state === "Khong hoat dong"){
            console.log("test")
            throw new NotFoundException("User account not action")
        }
        console.log("test outer")
        let payload = { id: loginResult.id, info: loginResult.email, role: loginResult.role };
        jsonWebToken = this.jwtService.sign(payload);
        return { access_token: jsonWebToken as String, infoUser: loginResult.email };
    }

    async registerUser(userDto) {
        var process = await this.userService.UserRegister(userDto)
        let payload = {
            id: process.id,
            username: process.username,
            email: process.email,
            role: process.role,
            state: process.state,
            stockId: process.stockId
        },
            jsonWebToken = this.jwtService.sign(payload)
        return { access_token: jsonWebToken as String }
    }
}