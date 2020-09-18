import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    username: { type: String},
    email: { type: String},
    password: { type: String},
    role: {type: String},
    state: { type: String},
    stockId: { type: String},
    info: new mongoose.Schema({
        address: {type: String},
        city: { type: String},
        province: { type: String},
        phoneNumber: { type: String}
    })
})

export interface User extends mongoose.Document{
    username: string,
    email: string,
    password: string,
    role: string,
    state: string,
    stockId: string,
    info: {
        address: string,
        city: string,
        province: string,
        phoneNumber: string
    }
}