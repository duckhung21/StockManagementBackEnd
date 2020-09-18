import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {StockSchema} from '../Models/stock.model'
import {StockController} from '../Controllers/stock.controller'
import {StockService} from '../Services/stock.service'

@Module({
    imports: [MongooseModule.forFeature([{name: 'Stock', schema: StockSchema}])],
    controllers: [StockController],
    providers: [StockService],
    exports: [StockService]
})

export class StockModule {}