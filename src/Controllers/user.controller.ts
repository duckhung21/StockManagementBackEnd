import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
import { UserService } from '../Services/user.service';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    // @Post('/addUser')
    // async addUser (
    //     @Body('userName') userName : string,
    //     @Body('email') email : string,
    //     @Body('password') password : string,
    //     @Body('role') role : string,
    //     @Body('address') address : string,
    //     @Body('status') status : string
    // ){ 
    //     const newUser = await this.userService.insertUser(userName, email, password, role, address, status);
    //     return { user: newUser}
    // }
}