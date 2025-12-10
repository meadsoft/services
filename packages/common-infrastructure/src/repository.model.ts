import { Entity } from '@meadsoft/common';

export interface IQueryRepository<TModel extends Entity> {
    findById(id: string): Promise<TModel | null>;
    findAll(): Promise<TModel[]>;
}

export interface ICommandRepository<
    TNewModel extends object,
    TModel extends Entity,
> {
    create(item: TNewModel, userId: string): Promise<TModel>;
    update(
        id: string,
        updates: Partial<TModel>,
        userId: string,
    ): Promise<TModel | undefined>;
    delete(id: string): Promise<boolean>;
}

export interface IRepository<TNewModel extends object, TModel extends Entity>
    extends IQueryRepository<TModel>, ICommandRepository<TNewModel, TModel> {}
