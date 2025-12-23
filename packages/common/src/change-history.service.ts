import { IChangeHistory } from './contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangeHistoryService {
    create<TInput extends object>(
        userId: string,
        item: TInput,
    ): IChangeHistory & TInput {
        const changeItem: IChangeHistory & TInput = {
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
        updates: IChangeHistory & TInput,
    ): IChangeHistory & TInput {
        return {
            ...updates,
            createdById: updates.createdById ?? null,
            createdDate: updates.createdDate ?? new Date().toISOString(),
            updatedDate: new Date().toISOString(),
            updatedById: userId,
        };
    }
}
