import { ICrudService } from '@meadsoft/common';
import { ICrudRepository } from '@meadsoft/common-infrastructure';
import { QueryService } from './query.service';
import { NotImplementedException } from '@nestjs/common';

export class CrudService<TNewModel, TModel>
    extends QueryService<TModel>
    implements ICrudService<TNewModel, TModel>
{
    constructor(
        repository: ICrudRepository<TModel>,
        public readonly newToPersistent: (item: TNewModel) => TModel,
        public readonly updater: (existing: Partial<TModel>) => Partial<TModel>,
    ) {
        super(repository);
    }

    async createOne(item: TNewModel): Promise<TModel> {
        const newItem: TModel = this.newToPersistent(item);
        return await this.repository.createOne(newItem);
    }
    async createMany(...items: TNewModel[]): Promise<TModel[]> {
        const newItems: TModel[] = items.map(this.newToPersistent);
        return await this.repository.createMany(...newItems);
    }
    async updateOne(id: string, updates: Partial<TModel>): Promise<TModel> {
        this.updater(updates);
        return await this.repository.updateOne(id, updates);
    }
    async updateMany(): Promise<number> {
        return await Promise.reject(new NotImplementedException());
        // TODO: implement IFilter to SQL mapping
        // this.updater(updates);
        // return await this.repository.updateMany(updates, ...filters);
    }
    async deleteOne(id: string): Promise<boolean> {
        return await this.repository.deleteOne(id);
    }
    async deleteMany(): Promise<number> {
        return await Promise.reject(new NotImplementedException());
        // TODO: implement IFilter to SQL mapping
        // return await this.repository.deleteMany(...filters);
    }
}
