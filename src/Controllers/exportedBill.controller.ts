import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import {ExportedBillService} from '../Services/exportedBill.service'
import {CustomerInfo} from '../Dtos/customerInfo.dto'
import {ListOfProduct} from '../Dtos/exportProduct.dto'

@Controller('exportedBill')
export class ExportedBillController{
    constructor(
        private readonly exportedBillService: ExportedBillService
    ){}

    @Post('/createExportedBill')
    async createExportedBillService (
        @Body("exportedUserId") exportedUserId: string,
        @Body("stockId") stockId: string,
        @Body("customerInfo") customerInfo: CustomerInfo,
    ){
        return this.exportedBillService.CreateExportedBill(exportedUserId, stockId, customerInfo)
    }

    @Post('/addProductToExportedBill')
    async addProductToExportedBill(
        @Body("billID") billId: string,
        @Body("stockId") stockId: string,
        @Body("listOfProduct") listOfProduct: ListOfProduct
    ){
        return this.exportedBillService.addProductToExportedBill(stockId, billId, listOfProduct)
    }
}