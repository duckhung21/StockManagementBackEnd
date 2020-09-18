import { Controller, Post, Body, UseGuards, SetMetadata, Req, Request } from "@nestjs/common";
import { AuthService} from './auth.service';
import { UserObject } from '../Dtos/user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Roles } from '../auth/roles.decorator'
// import { jwtConstants } from "./constant";

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService ){}

    @Post('login')
    async login (
        @Body('username') username: string,
        @Body('password') password: string
    ){
        return this.authService.login(username,password);
    }

    // @Roles("Admin")
    // @UseGuards(JwtAuthGuard)
    @Post('/registerUser')
    async registerUser (
        // @Request() request,
        @Body("userObject") userObject: UserObject 
    ){
        return this.authService.registerUser(userObject)
    }

}