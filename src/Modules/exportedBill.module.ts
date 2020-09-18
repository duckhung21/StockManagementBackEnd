import {Module, Controller} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {ExportedBillSchema} from '../Models/exportingBill.model'
import { ExportedBillService } from '../Services/exportedBill.service'
import {ExportedBillController} from '../Controllers/exportedBill.controller'
import {StockModule} from '../Modules/stock.module'
import {StockSchema} from '../Models/stock.model'

@Module({
    imports: [StockModule, MongooseModule.forFeature([{name: 'ExportedBill', schema: ExportedBillSchema},{name: 'Stock', schema: StockSchema}])],
    controllers: [ExportedBillController],
    providers: [ExportedBillService],
    exports: [ExportedBillService]
})

export class ExportedBillModule {}