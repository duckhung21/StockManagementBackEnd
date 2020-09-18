import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import {ActionHistoryService} from '../Services/actionHistory.service'
import { ActionObject } from '../Dtos/actionObject.dto'
import { stringLiteral } from '@babel/types';

@Controller('actionHistory')
export class ActionHistoryController {
    constructor(
        private readonly actionHistoryService: ActionHistoryService
    ){}

    @Post('/createActionByStock')
    async createActionByStock (
        @Body("actionObject") actionObject: ActionObject
    ){
        return this.actionHistoryService.createActionByStock(actionObject)
    }

    @Post("/createActionHistory")
    async createActionHistory (
        @Body('stockId') stockId: string,
        @Body('userId') userId: string,
        @Body('actionDes') actionDes: string
    ) {
        return this.actionHistoryService.CreateActionHistory(stockId, userId, actionDes)
    }

    @Post("/GetAllActionHistory")
    async GetAllActionHistory(
        @Body("stockId") stockId: string
    ){
        return this.actionHistoryService.GetAllHistoryAction(stockId)
    }
}