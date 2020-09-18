import * as mongoose from 'mongoose'

export const ExportedBillSchema = new mongoose.Schema({
    stockId: {type: String},
    listOfBill: [
        {
            exportedUser: {type: String},
            exportedDate: {type: Number},
            exportedTo: new mongoose.Schema({
                customerName: {type: String},
                address: {type: String},
                city: {type:String},
                province: {type:String},
                phoneNumber: {type: String}
            }),
            detailBill: [
                {
                    palletID: {type: String},
                    productID: {type: String},
                    productName: {type: String},
                    quantity: {type: String}
                }
            ]
        }
    ]
})

export interface ExportedBill extends mongoose.Document{
    stockId: string
    listOfBill: [
        {
            exportedUser: string
            exportedDate: Number
            exportedTo: {
                customerName: string
                address: string
                city: string
                province: string
                phoneNumber: string}
            
            detailBill: [
                {
                    palletID: string
                    productID: string
                    productName: string
                    quantity: string
                }
            ]
        }
    ]
}