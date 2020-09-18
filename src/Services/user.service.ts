import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const bcrypt = require('bcrypt');
import {User} from '../Models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {}

    async UserRegister (userDto) {
        var state = "Hoat dong"
        const hashedPassword = bcrypt.hashSync(userDto.password,12);
        var userModel = new this.userModel({
            username: userDto.username,
            email: userDto.email,
            password: hashedPassword,
            role: userDto.role,
            state: state,
            stockId: userDto.stockId,
            info: {
                address: userDto.address,
                city: userDto.city,
                province: userDto.province,
                phoneNumber: userDto.phoneNumber
            }
        })

        var result = await userModel.save()
        return {
            id: result.id,
            username: result.username,
            email: result.email,
            role: result.role,
            state: result.state,
            stockId: result.stockId
        }
    }

    async findByLogin (username: string, password: string){
        // const hashedPassword = bcrypt.hashSync(password,12);
        const getUsername = await this.userModel.findOne(
            {
                username: username,
                // password: hashedPassword
            },
            function(err,result){
                if(err){
                    console.log(err)
                } else {
                    console.log(result)
                }
            }
        )

        if(!getUsername){
            throw new NotFoundException('khong tim thay user');
        }

        const match = bcrypt.compareSync(password, getUsername.password);
        if(!match){
            throw new NotFoundException('password sai');
        }

        return getUsername;
    }
}