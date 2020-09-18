import * as mongoose from 'mongoose'

export const ActionHistorySchema = new mongoose.Schema({
    stockId: { type: String },
    activities: [
        {
            userID: { type: String },
            actionDate: { type: Number },
            actionDescription: { type: String }
        }
    ]
})


export interface ActionHistory extends mongoose.Document {
    stockId: string,
    activities: [
        {
            userID: string,
            actionDate: number,
            actionDescription: string
        }
    ]
}
