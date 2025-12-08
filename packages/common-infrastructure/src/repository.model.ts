import { BaseCmsModel } from '@haru-cafe/common';

export interface IQueryRepository<TModel extends BaseCmsModel> {
    findById(id: string): Promise<TModel | null>;
    findAll(): Promise<TModel[]>;
}

export interface ICommandRepository<
    TNewModel extends object,
    TModel extends BaseCmsModel,
> {
    create(item: TNewModel, userId: string): Promise<TModel>;
    update(
        id: string,
        updates: Partial<TModel>,
        userId: string,
    ): Promise<TModel | undefined>;
    delete(id: string): Promise<boolean>;
}

export interface IRepository<
    TNewModel extends object,
    TModel extends BaseCmsModel,
>
    extends IQueryRepository<TModel>, ICommandRepository<TNewModel, TModel> {}
