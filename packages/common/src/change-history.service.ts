import { IChangeHistory, IUpdateHistory } from './contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangeHistoryService {
    create(userId: string): IChangeHistory {
        return {
            createdById: userId,
            createdDate: new Date().toISOString(),
            updatedById: userId,
            updatedDate: new Date().toISOString(),
        };
    }

    update<TOutput extends IUpdateHistory>(
        userId: string,
        updates: TOutput,
    ): TOutput {
        updates.updatedDate = new Date().toISOString();
        updates.updatedById = userId;
        return updates;
    }
}
