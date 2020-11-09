import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import {StockService} from '../Services/stock.service'
import {StockInfo} from '../Dtos/addNewStock.dto'
import {ProductDto} from '../Dtos/product.dto'
import {PalletDto} from '../Dtos/pallet.dto'
import { Roles } from 'src/auth/roles.decorator';

@Controller('stock')
export class StockController {
    constructor(
        private readonly stockService: StockService
    ){}

    
    @Post('/addStockInfo')
    async addInfoStock(
        @Body() stockInfo: StockInfo
    ) {
        return this.stockService.addNewStock(stockInfo)
    }

    @Post('/addProductIntoStock')
    async addProductIntoStock (
        @Body("stockId") stockId: string,
        @Body() productDto: ProductDto
    ){
        return this.stockService.addNewProductIntoStock(stockId, productDto)
    }

    @Post('/addPalletOfProduct')
    async addPalletOfProduct(
        @Body("stockId") stockId: string,
        @Body("productId") productId: string,
        @Body() palletObject: PalletDto
    ){
        return this.stockService.addPalletOfProduct(stockId,productId,palletObject)
    }

    @Post('/updatePalletOfProduct/:stockId')
    async updatePalletOfProduct(
        @Param("stockId") stockId: string,
        @Body("productId") productId: string,
        @Body("idPallet") idPallet: string,
        @Body() palletObject: PalletDto
    )
    {
        return this.stockService.updatePalletOfProduct(stockId, productId, idPallet, palletObject)
    }

    @Post('/updateQuantityOfProduct')
    async updateQuantityOfProduct (
        @Body("stockId") stockId: string,
        @Body("productID") productID: string,
        @Body("idPallet") idPallet: string,
        @Body("qty") qty: string
    ){
        return this.stockService.updateQuantityOfProduct(stockId, productID, idPallet, qty)
    }

    @Post('/getProductsInStock')
    async getProductInStock (
        @Body("stockId") stockId: string
    ){
        return this.stockService.getProductsInStock(stockId)
    }

    @Post('/getProductPalletsById')
    async getProductPalletsById ( 
        @Body("productID") productId: string,
        @Body("stockId") stockId: string
    )
    {
        return this.stockService.getProductPalletsByProductID(productId, stockId)
    }

    @Post('/getProductsInStockOnlySomeFields')
    async getProductInStockOnlySomeFields(
        @Body("stockId") stockId: string
    ){
        return this.stockService.getProductsInStockOnlySomeFields(stockId)
    }
}
