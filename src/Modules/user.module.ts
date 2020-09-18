import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {UserSchema} from '../Models/user.model';
import {UserService} from '../Services/user.service';
import {UserController} from '../Controllers/user.controller';


@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UsersModule{}