import * as mongoose from 'mongoose'

export const StockSchema = new mongoose.Schema({
    stockId: {type: String},
    stockName: {type: String},
    infoStock: new mongoose.Schema ({
        address: String,
        city: String,
        province: String
    }),
    goods: [
        {
            productID: {type: String},
            productName: {type: String},
            productGroup: {type: String},
            pallets: [
                {
                    idPallet: {type: String},
                    palletDate: {type: Number},
                    qty: {type: Number},
                    price: new mongoose.Schema({
                        inputPrice: {type: Number},
                        outputPrice: {type: Number}
                    }),
                    size: new mongoose.Schema({
                        weight: {type: String},
                        unit: {type: String},
                        qtyPerBox: {type: Number}
                    }),
                    supplier: new mongoose.Schema({
                        supplierName: {type: String},
                        address: new mongoose.Schema({
                            detail: {type: String},
                            streetName: {type: String},
                            city: {type: String},
                            province: {type: String},
                            phoneNumber: {type: String}
                        })
                    })
                }
            ]
        }
    ]
}
)

export interface Stock extends mongoose.Document {
    stockId: string
    stockName: string,
    infoStock: {
        address: string,
        city: string,
        province: string
    },
    goods: [
        {
            productID: string,
            productName: string,
            productGroup: string,
            pallets: [
                {
                    idPallet: string,
                    palletDate: number,
                    qty: number,
                    price: {
                        inputPrice: number,
                        outputPrice: number
                    },
                    size: {
                        weight: string,
                        unit: string,
                        qtyPerBox: Number
                    },
                    supplier: {
                        supplierName: string,
                        address: {
                            detail: string,
                            streetName: string,
                            city: string,
                            province: string,
                            phoneNumber: string
                        }
                    }
                }
            ]
        }
    ]
}