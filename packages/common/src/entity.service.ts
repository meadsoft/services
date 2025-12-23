import { IEntity } from './contracts';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EntityService {
    create<TInput extends object>(
        userId: string,
        item: TInput,
    ): IEntity & TInput {
        const changeItem: IEntity & TInput = {
            id: uuidv4(),
            ...item,
            createdById: userId,
            createdDate: new Date().toISOString(),
            updatedById: userId,
            updatedDate: new Date().toISOString(),
        };
        return changeItem;
    }

    update<TInput extends object>(
        userId: string,
        updates: IEntity & TInput,
    ): IEntity & TInput {
        return {
            ...updates,
            createdById: updates.createdById ?? null,
            createdDate: updates.createdDate ?? new Date().toISOString(),
            updatedDate: new Date().toISOString(),
            updatedById: userId,
        };
    }
}
