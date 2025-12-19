import { ChangeHistory } from './change-history.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangeHistoryService {
    create(item: ChangeHistory, userId: string): ChangeHistory {
        item.createdById = userId;
        item.createdDate = new Date().toISOString();
        item.updatedById = userId;
        item.updatedDate = new Date().toISOString();
        return item;
    }

    update(updates: Partial<ChangeHistory>, userId: string): ChangeHistory {
        return {
            ...updates,
            createdById: updates.createdById ?? null,
            createdDate: updates.createdDate ?? new Date().toISOString(),
            updatedDate: new Date().toISOString(),
            updatedById: userId,
        };
    }
}
