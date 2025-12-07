import { BaseCmsModel } from '../../../../cms-contracts/src/base.entity';

export interface IReadOnlyRepository<TModel extends BaseCmsModel> {
    findById(id: string): Promise<TModel | null>;
    findAll(): Promise<TModel[]>;
}

export interface IRepository<
    TNewModel extends object,
    TModel extends BaseCmsModel,
> extends IReadOnlyRepository<TModel> {
    create(item: TNewModel, userId: string): Promise<TModel>;
    update(
        id: string,
        updates: Partial<TModel>,
        userId: string,
    ): Promise<TModel | undefined>;
    delete(id: string): Promise<boolean>;
}
