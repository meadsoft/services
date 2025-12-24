import {
    ChangeHistoryService,
    EntityService,
    ICrudService,
    IEntity,
    IFilter,
    IUpdateHistory,
} from '@meadsoft/common';
import { ICrudRepository } from '@meadsoft/common-infrastructure';
import { QueryService } from './query.service';
import { NotImplementedException } from '@nestjs/common';

export class CommandService<
    TNewModel extends object,
    TModel extends IEntity & TNewModel,
>
    extends QueryService<TModel>
    implements ICrudService<TNewModel, TModel>
{
    constructor(
        repository: ICrudRepository<TModel>,
        public readonly entityService: EntityService,
        public readonly changeHistoryService: ChangeHistoryService,
        private readonly newToPersistent: (userId: string, newModel: TNewModel) => TModel,
    ) {
        super(repository);
    }

    async createOne(userId: string, newItem: TNewModel): Promise<TModel> {
        const item = this.newToPersistent(
            userId,
            this.entityService.create<TNewModel>(userId, newItem),
        );
        return await this.repository.createOne(item);
    }

    async createMany(
        userId: string,
        ...newItems: TNewModel[]
    ): Promise<TModel[]> {
        const items = newItems.map((item) =>
            this.newToPersistent(
                userId,
                this.entityService.create<TNewModel>(userId, item),
            ),
        );
        return await this.repository.createMany(...items);
    }

    async updateOne(
        userId: string,
        id: string,
        updates: IUpdateHistory & Partial<TModel>,
    ): Promise<TModel> {
        const updatedItem = this.changeHistoryService.update(userId, updates);
        return await this.repository.updateOne(id, updatedItem);
    }

    // TODO: implement IFilter to SQL mapping
    async updateMany(
        userId: string,
        updates: Partial<TModel>,
        ...filters: IFilter[]
    ): Promise<number> {
        console.log(userId, updates, filters);
        return await Promise.reject(new NotImplementedException());
    }

    async deleteOne(userId: string, id: string): Promise<boolean> {
        const existingItem = await this.repository.findOne(id);
        if (!existingItem) {
            return false;
        }
        // TODO: improve typing here so unsafe assertions are not needed
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        const updates = {
            updatedById: null,
            updatedDate: null,
        } as IUpdateHistory & Partial<TModel>;
        // Update the items change history before deletion for proper auditing
        const updatedChangeHistory = this.changeHistoryService.update(
            userId,
            updates,
        );
        await this.updateOne(userId, id, updatedChangeHistory);
        return await this.repository.deleteOne(id);
    }

    async deleteMany(userId: string): Promise<number> {
        // TODO: improve typing here so unsafe assertions are not needed
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        const updates = {
            updatedById: null,
            updatedDate: null,
        } as IUpdateHistory & Partial<TModel>;
        // Update the items change history before deletion for proper auditing
        const updatedChangeHistory = this.changeHistoryService.update(
            userId,
            updates,
        );
        await this.updateMany(userId, updatedChangeHistory);
        return await Promise.reject(new NotImplementedException());
    }
}
