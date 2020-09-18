import {Module, Controller} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {ActionHistorySchema} from '../Models/actionHistory.model'
import {ActionHistoryController} from '../Controllers/actionHistory.controller'
import {ActionHistoryService} from '../Services/actionHistory.service'

@Module({
    imports: [MongooseModule.forFeature([{name: "ActionHistory", schema: ActionHistorySchema}])],
    controllers: [ActionHistoryController],
    providers: [ActionHistoryService],
    exports: [ActionHistoryService]
})

export class ActionHistoryModule {}