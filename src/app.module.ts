import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {StockModule} from './Modules/stock.module'
import {ExportedBillModule} from './Modules/exportedBill.module'
import {ActionHistoryModule} from './Modules/actionHistory.module'
import { UsersModule } from './Modules/user.module'
import { AuthModule } from './auth/auth.module'

import { RegisterMiddleware } from './middleware/register.middleware'

@Module({
  imports: [StockModule, ExportedBillModule, ActionHistoryModule, UsersModule, AuthModule, MongooseModule.forRoot('mongodb+srv://DucKhung:duckhung21@cluster0-4tnfu.mongodb.net/<dbname>?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure( consumer: MiddlewareConsumer){
    consumer
      .apply(RegisterMiddleware)
      .forRoutes({path: '', method: RequestMethod.POST})
  }
}
