import { OnCreationData } from '../../../../../cms-contracts/src/on-creation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseModelService {
    addCreationData<T extends object>(
        item: T,
        userId: string,
    ): T & OnCreationData {
        // javascript abuse
        const newItem = item as T & OnCreationData;
        //
        newItem.createdById = userId;
        newItem.createdDate = new Date();
        newItem.updatedById = userId;
        newItem.updatedDate = new Date();
        return newItem;
    }

    addUpdateData(
        updates: Partial<OnCreationData>,
        userId: string,
    ): OnCreationData {
        return {
            ...updates,
            createdById: updates.createdById ?? null,
            createdDate: updates.createdDate ?? new Date(),
            updatedDate: new Date(),
            updatedById: userId,
        };
    }
}
