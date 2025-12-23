import { IEntity } from './contracts';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ChangeHistoryService } from './change-history.service';

@Injectable()
export class EntityService {
    constructor(private readonly changeHistoryService: ChangeHistoryService) {}

    create<TInput extends object>(
        userId: string,
        item: TInput,
    ): IEntity & TInput {
        const changeItem: IEntity & TInput = {
            id: uuidv4(),
            ...this.changeHistoryService.create<TInput>(userId, item),
        };
        return changeItem;
    }

    update<TInput extends object>(
        userId: string,
        updates: IEntity & TInput,
    ): IEntity & TInput {
        return this.changeHistoryService.create<IEntity & TInput>(
            userId,
            updates,
        );
    }
}
