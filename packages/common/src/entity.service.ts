import { IEntity } from './contracts';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ChangeHistoryService } from './change-history.service';

@Injectable()
export class EntityService {
    constructor(private readonly changeHistoryService: ChangeHistoryService) {}

    create<TEntity extends IEntity>(
        userId: string,
        item: Partial<TEntity>,
    ): TEntity {
        const changeItem: IEntity & TEntity = {
            id: uuidv4(),
            ...item,
            ...this.changeHistoryService.create(userId),
        };
        return changeItem;
    }
}
