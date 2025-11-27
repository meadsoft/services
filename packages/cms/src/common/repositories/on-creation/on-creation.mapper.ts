import {
    CREATED_BY_DEFAULT,
    IOnCreationData,
} from '@haru-cafe/cms/contracts/on-creation.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseModelService {
    addCreationData(item: IOnCreationData, userId: string): IOnCreationData {
        item.createdById = userId;
        item.createdDate = new Date();
        item.updatedById = userId;
        item.updatedDate = new Date();
        return item;
    }

    addUpdateData(
        updates: Partial<IOnCreationData>,
        userId: string,
    ): IOnCreationData {
        return {
            ...updates,
            createdById: updates.createdById ?? CREATED_BY_DEFAULT,
            createdDate: updates.createdDate ?? new Date(),
            updatedDate: new Date(),
            updatedById: userId,
        };
    }
}
