import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Error } from 'mongoose'

import { ActionHistory } from '../Models/actionHistory.model'

@Injectable()
export class ActionHistoryService {
    constructor(
        @InjectModel("ActionHistory") private readonly actionHistoryModel: Model<ActionHistory>
    ) { }

    async createActionByStock(actionObject) {
        var newAction = new this.actionHistoryModel({
            stockId: actionObject.stockId,
            activities: actionObject.activities
        })

        var result = await newAction.save()
        return { message: "tao kho trong lich su hoat dong thanh cong: " + result.id }
    }

    async testFunc(stockId, userId, actionDes) {
        var outputResult
        let actionModel = this.actionHistoryModel
        let date = new Date().getTime()
        let process1 = await actionModel.findOneAndUpdate(
            {
                "stockId": stockId
            },
            {
                $push: {
                    "activities": {
                        "userID": userId,
                        "actionDate": date,
                        "actionDescription": actionDes
                    }
                }
            }, { upsert: true }
        ).exec()
        return process1
    }
    async CreateActionHistory(stockId, userId, actionDes) {
        var outputResult
        var func = await this.testFunc(stockId, userId, actionDes)
        console.log(typeof func)
        return func
    }

    async GetAllHistoryAction(stockId) {
        const actModel = this.actionHistoryModel

        var result = await actModel.findOne({ stockId: stockId }).exec()
        console.log(result.activities)
        return result.activities
    }
}