import { IQueryService } from '@meadsoft/common';
import { ICrudRepository } from '@meadsoft/common-infrastructure';

export class QueryService<TModel> implements IQueryService<TModel> {
    constructor(public readonly repository: ICrudRepository<TModel>) {}
    async findOne(id: string): Promise<TModel | null> {
        return await this.repository.findOne(id);
    }
    async findMany(): Promise<TModel[]> {
        // TODO: implement IFilter to SQL mapping
        return await this.repository.findMany();
    }
}
