import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Stock } from '../Models/stock.model'


@Injectable()
export class StockService {
    constructor(
        @InjectModel("Stock") private readonly stockModel: Model<Stock>
    ) { }

    async addNewStock(stockInfo) {

        var stockID = Math.floor(Math.random() * 11);

        var newStock = new this.stockModel({
            stockId: stockID,
            stockName: stockInfo.stockName,
            infoStock: {
                address: stockInfo.address,
                city: stockInfo.city,
                province: stockInfo.province
            }
        })

        var result = await newStock.save()
        return { message: "create stock successful" }
    }


    async findStockById(stockId) {
        var res
        var stockModel = this.stockModel
        var condition1 = {
            "stockId": stockId
        }

        var p = await stockModel.findOne(
            condition1,
            function (err, result) {

                if (err) {
                    // console.log("stage1: "+ err)
                    res = err
                } else {
                    // console.log(result)
                    res = result
                    // console.log('stage1: ' + res)
                }
            }
        )
        // console.log("res2: " + res)
        return res
    }

    async addNewProductIntoStock(stockId, productObject) {
        var outputResult
        var productId = Math.random().toString(36).substr(2, 9)
        var idPallet = "123"

        var stockModel = this.stockModel
        // console.log(typeof stockId)
        var stage1 = await this.findStockById(stockId)
        // console.log(stage1)

        if (stage1 == null) {
            outputResult = { message: 'khong tim thay kho' }
            console.log(outputResult)
        } else {
            // console.log(stage1.goods)
            if (stage1.goods.length < 1) {
                //add product
                console.log("stage 3")
                stockModel.findOneAndUpdate(
                    {
                        "stockId": stockId
                    },
                    {
                        $push: {
                            "goods": {
                                "productID": productId,
                                "productName": productObject.productName,
                                "productGroup": productObject.productGroup,
                                "pallets": productObject.pallets
                            }
                        }
                    }, function (err, result) {
                        if (err) {
                            console.log(err)
                            outputResult = { message: err }
                        } else {
                            console.log(result)
                            outputResult = { message: "them san pham thanh cong" }
                        }
                    }
                )
            } else {
                //check product
                console.log("stage 4")
                console.log(stockId + "/" + productObject.productName)
                // var checkProductInStock = await this.checkProductExistInStock(stockId, productObject.productName)
                // console.log(checkProductInStock)

                await stockModel.findOneAndUpdate(
                    {
                        "goods.productName": { $ne: productObject.productName }
                    },
                    {
                        $push: {
                            "goods": {
                                "productID": productId,
                                "productName": productObject.productName,
                                "productGroup": productObject.productGroup,
                                "pallets": productObject.pallets
                            }
                        }
                    },
                    { new: true },
                    function (err, result) {
                        if (err) {
                            console.log(err)
                        } else if (result == null) {
                            // console.log("san pham da ton tai trong kho")
                            outputResult = { message: "San pham da ton tai trong kho" }
                        } else {
                            // console.log("them san pham thanh cong")
                            outputResult = { message: "Them san pham thanh cong vao kho: " + stockId }
                        }
                    }
                )
            }
            return outputResult
        }
    }

    // list goods in stock and pick one up and add idPallet
    async addPalletOfProduct(stockId, productId, palletObject) {
        var outputResult
        var date = new Date().getTime()
        var idPallet = "1234test"
        var stockModel = this.stockModel

        var condition = {
            "stockId": stockId,
            "goods": {
                $elemMatch: {
                    "productID": productId
                }
            }
        }

        stockModel.findOneAndUpdate(
            condition,
            {
                $push: {
                    "goods.$.pallets":
                    {
                        "idPallet": idPallet,
                        "palletDate": date,
                        "qty": palletObject.qty,
                        "price": {
                            "inputPrice": palletObject.inputPrice,
                            "outputPrice": palletObject.outputPrice
                        },
                        "size": {
                            "weight": palletObject.weight,
                            "unit": palletObject.unit,
                            "qtyPerBox": palletObject.qtyPerBox
                        },
                        "supplier": {
                            "supplierName": palletObject.supplierName,
                            "address": {
                                "detail": palletObject.detail,
                                "streetName": palletObject.streetName,
                                "city": palletObject.city,
                                "province": palletObject.province,
                                "phoneNumber": palletObject.phoneNumber
                            }
                        }
                    }
                }
            },
            function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            }
        )
    }


    async updatePalletOfProduct(stockId, productId, idPallet, palletObject) {
        var stockModel = this.stockModel
        var outputResult
        var condition = {
            "stockId": stockId,
            "goods": {
                $elemMatch: {
                    "productID": productId,
                    "pallets.idPallet": idPallet
                }
            }
        }
        stockModel.findOneAndUpdate(
            condition,
            {
                $set: {
                    "goods.$.pallets": {
                        "qty": palletObject.qty,
                        "price": {
                            "inputPrice": palletObject.inputPrice,
                            "outputPrice": palletObject.outputPrice
                        },
                        "size": {
                            "weight": palletObject.weight,
                            "unit": palletObject.unit,
                            "qtyPerBox": palletObject.qtyPerBox
                        },
                        "supplier": {
                            "supplierName": palletObject.supplierName,
                            "address": {
                                "detail": palletObject.detail,
                                "streetName": palletObject.streetName,
                                "city": palletObject.city,
                                "province": palletObject.province,
                                "phoneNumber": palletObject.phoneNumber
                            }
                        }
                    }
                }
            }, { new: true },
            function (err, result) {
                if (err) {
                    console.log(err)
                    outputResult = { message: "loi he thong: " + err }
                }
                else {
                    console.log(result)
                    outputResult = { message: "Update san pham thanh cong" }
                }
            }
        )
        return outputResult
    }


    async updateQuantityOfProduct(stockId, productId, idPallet, quantity) {
        var outputResult
        console.log(productId, quantity, stockId, idPallet)
        
        var stockModel = this.stockModel
        await stockModel.updateOne(
            {
            },
            {
                $inc: {
                    'goods.$[a].pallets.$[b].qty': quantity
                }
            },{
                multi:true,
                "arrayFilters": [{"a.productID": productId},{"b.idPallet": idPallet}]
            },

            function (err, result) {
                if (err) {
                    console.log(err)
                    outputResult = { message: "loi he thong: " + err }
                } else {
                    console.log(result)
                    outputResult = "true"
                }
            }
        )
        return outputResult
// su dung transaction
        // try {
        //     const session = await this.stockModel.db.startSession()
        //     session.startTransaction({
        //         readConcern: { level: 'snapshot' },
        //         writeConcern: { w: 'majority' },
        //         readPreference: 'primary'
        //     })
        //     try {
        //         console.log(stockId, productId, idPallet, quantity)
        //         var outputResult
        //         await this.stockModel.updateOne(
        //             {
        //                 stockId: stockId
        //             },
        //             {
        //                 $inc: {
        //                     'goods.$[a].pallets.$[b].qty': quantity
        //                 }
        //             }, {
        //             multi: true,
        //             new: true,
        //             upsert: true,
        //             "arrayFilters": [{ "a.productID": productId }, { "b.idPallet": idPallet }]
        //         },

        //             function (err, result) {
        //                 if (err) {
        //                     console.log(err)
        //                     outputResult = { message: "loi he thong: " + err }
        //                 } else {
        //                     console.log(result)
        //                     outputResult = { message: "Update san pham thanh cong" }
        //                 }
        //             }
        //         ).session(session)
        //         .exec()
        //         return outputResult
        //     } catch (err) {
        //         await session.abortTransaction();
        //         console.log("stage1: " + err)
        //     } finally {
        //         session.endSession()
        //     }
        // } catch (err) {
        //     console.log("stage2: ")
        // }
    }
}