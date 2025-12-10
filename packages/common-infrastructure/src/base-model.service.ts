import { OnCreationData } from '@meadsoft/common';
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
        newItem.createdDate = new Date().toISOString();
        newItem.updatedById = userId;
        newItem.updatedDate = new Date().toISOString();
        return newItem;
    }

    addUpdateData(
        updates: Partial<OnCreationData>,
        userId: string,
    ): OnCreationData {
        return {
            ...updates,
            createdById: updates.createdById ?? null,
            createdDate: updates.createdDate ?? new Date().toISOString(),
            updatedDate: new Date().toISOString(),
            updatedById: userId,
        };
    }
}
