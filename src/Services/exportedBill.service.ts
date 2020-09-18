import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel, MongooseModule } from '@nestjs/mongoose'
import { Model, Mongoose } from 'mongoose'
import * as mongoose from '@nestjs/mongoose'
import { ExportedBill } from '../Models/exportingBill.model'
import { Stock } from '../Models/stock.model'
import { StockService } from '../Services/stock.service'
import { MongoClient } from 'mongodb'


@Injectable()
export class ExportedBillService {
    constructor(
        @InjectModel("ExportedBill") private readonly exportedBillModel: Model<ExportedBill>,
        @InjectModel("Stock") private readonly stockModel: Model<Stock>,
        // private readonly stockService: StockService
    ) { }

    // async test() {
    //     const uri = "mongodb+srv://DucKhung:duckhung21@cluster0-4tnfu.mongodb.net/<dbname>?retryWrites=true&w=majority"
    //     const client = new MongoClient(uri)
    //     await client.connect()

    //     const session = client.startSession()
    //     const transactionOptions = {
    //         readPreference: 'primary',
    //         readConcern: { level: 'local' },
    //         writeConcern: { w: 'majority' }
    //     }

    //     try {
    //         await session.withTransaction(async () => {

    //         })
    //     } finally {

    //     }
    // }

    async CreateExportedBill(exportedUserID, stockId, customerInfoObject) {
        var date = new Date().getTime()
        var outputResult1
        var exportedBillModel = this.exportedBillModel
        var newBill = new this.exportedBillModel({
            stockId: stockId
        })

        var process1 = await newBill.save(async function (err, result) {
            if (err) {
                console.log(err)
            } else {
                // console.log(result.stockId)
                await exportedBillModel.findOneAndUpdate(
                    { stockId: result.stockId },
                    {
                        $push: {
                            "listOfBill": {
                                "exportedUser": exportedUserID,
                                "exportedDate": date,
                                "exportedTo": {
                                    "customerName": customerInfoObject.customerName,
                                    "address": customerInfoObject.address,
                                    "city": customerInfoObject.city,
                                    "province": customerInfoObject.province,
                                    "phoneNumber": customerInfoObject.phoneNumber
                                },
                                "detailBill": customerInfoObject.detailBill
                            }
                        }
                    }, { new: true },
                    // function (err, result) {
                    //     if (err) {
                    //         console.log(err),
                    //             outputResult1 = { message: "loi he thong: " + err }
                    //     } else {
                    //         console.log(result)
                    //         outputResult1 = { message: "Tao hoa don xuat hang thanh cong" }
                    //     }
                    // }
                ).exec()
            }
        })
        console.log(outputResult1)
        return outputResult1
        /// cach 2 su dung closure function
    }

    // async addProductToExportedBill(stockId, idBill, listOfProduct) {
    //     console.log(listOfProduct)
    //     var outputResult
    //     var stockService = this.stockService
    //     var exBillModel = this.exportedBillModel
    //     var condition = {
    //         "listOfBill": {
    //             $elemMatch: {
    //                 "_id": idBill
    //             }
    //         }
    //     }

    //     await exBillModel.findOne(
    //         condition,
    //         function (err, result) {
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 // console.log(result)
    //                 listOfProduct.forEach(async item => {
    //                     // console.log(item.detailBill.length)
    //                     await exBillModel.findOneAndUpdate(
    //                         condition,
    //                         {
    //                             $push: {
    //                                 "listOfBill.$.detailBill": {
    //                                     "palletID": item.palletID,
    //                                     "productID": item.productID,
    //                                     "productName": item.productName,
    //                                     "quantity": item.quantity
    //                                 }
    //                             }

    //                         }, { new: true },
    //                     )
    //                     console.log("test")
    //                     var test = await stockService.updateQuantityOfProduct(stockId, item.productID, item.palletID, item.quantity)
    //                     console.log("test2")
    //                     console.log(typeof test)
    //                     if(test == "true"){
    //                         outputResult = {message: "xuat don hang thanh cong"}
    //                     }
    //                 },
    //                 )
    //             }
    //         }
    //     )
    //     // console.log(outputResult)
    //     return outputResult
    // }

    // async addProductToExportedBill(stockId, idBill, listOfProduct) {
    //     try {
    //         const session1 = await this.exportedBillModel.db.startSession()
    //         session1.startTransaction({
    //             readConcern: { level: 'snapshot' },
    //             writeConcern: { w: 'majority' },
    //             readPreference: 'primary'
    //         })

    //         var condition = {
    //             "listOfBill": {
    //                 $elemMatch: {
    //                     "_id": idBill
    //                 }
    //             }
    //         }

    //         var stockService = this.stockService
    //         try {
    //             var outputResult
    //             const exportedBillModel = this.exportedBillModel
    //             await exportedBillModel.findOne(
    //                 condition,
    //                 async function (err, result) {
    //                     if (err) {
    //                         console.log("loi he thong: " + err)
    //                     } else {
    //                         listOfProduct.forEach(async item => {
    //                             await exportedBillModel.findOneAndUpdate(
    //                                 condition,
    //                                 {
    //                                     $push: {
    //                                         "listOfBill.$.detailBill": {
    //                                             "palletID": item.palletID,
    //                                             "productID": item.productID,
    //                                             "productName": item.productName,
    //                                             "quantity": item.quantity
    //                                         }
    //                                     }
    //                                 }, { new: true },
    //                             ),
    //                                 await stockService.updateQuantityOfProduct(stockId, item.productID, item.palletID, item.quantity)
    //                         })
    //                     }
    //                 }
    //             )
    //             return outputResult
    //         } catch (err) {
    //             console.log("stg1 : " + err)
    //         } finally {
    //             session1.endSession()
    //         }
    //     } catch (err) {
    //         console.log("stg2: ") + err
    //     }
    // }


    async addProductToExportedBill(stockId, idBill, listOfProduct) {

        const uri = "mongodb+srv://DucKhung:duckhung21@cluster0-4tnfu.mongodb.net/<dbname>?retryWrites=true&w=majority"
        const client = new MongoClient(uri)
        await client.connect()

        try {
            // var sessionOptions = new { ... };
            const session = client.startSession()
            session.startTransaction({})
            // console.log("test")
            try {
                var outputResult
                var condition = {
                    "listOfBill": {
                        $elemMatch: {
                            "_id": idBill
                        }
                    }
                }

                const stockModel = this.stockModel
                const exportedBill = this.exportedBillModel
                // console.log('test')
                let process1 = await exportedBill.findOne(
                    condition,
                    async function (err, result) {
                        if (err) {
                            console.log("loi he thong: " + err)
                        } else {
                            console.log('test')
                        }
                    }
                );

                let process2 = await listOfProduct.forEach(async item => {
                    console.log("test inner")
                    await exportedBill.findOneAndUpdate(
                        condition,
                        {
                            $push: {
                                "listOfBill.$.detailBill": {
                                    "palletID": item.palletID,
                                    "productID": item.productID,
                                    "productName": item.productName,
                                    "quantity": item.quantity
                                }
                            }
                        }, { new: true, session },
                    ),

                    console.log("test inner1")

                    console.log(item.productID, item.quantity, stockId, item.palletID)
                    await stockModel.updateOne(
                        {},
                        {
                            $inc: {
                                'goods.$[a].pallets.$[b].qty': item.quantity
                            }
                        },
                        {
                            new: true,
                            session,
                            "arrayFilters": [{ "a.productID": item.productID }, { "b.idPallet": item.palletID }]
                        },
                        function (err, result) {
                            if (err) {
                                console.log(err)
                                outputResult = { message: "loi he thong: " + err }
                            } else {
                                console.log(result)
                                outputResult = true
                            }
                        }
                    ),
                        console.log("test inner 2")
                    await session.commitTransaction()
                    // await session.abortTransaction()
                    console.log("test inner 3: ")
                    // return outputResult
                })
            } catch (err) {
                await session.abortTransaction()
                console.error("loi he thong: " + err)
            }
            return outputResult
        } catch (err) {
            console.error("loi he thong 2: " + err)
        }
    }
}