import { IFilter } from '@meadsoft/common';

export interface IQueryService<TModel, TId = string> {
    findOne(id: TId): Promise<TModel | null>;
    findMany(...filters: IFilter[]): Promise<TModel[]>;
}

export interface ICommandService<TNewModel, TModel, TId = string> {
    createOne(item: TNewModel): Promise<TModel>;
    createMany(...items: TNewModel[]): Promise<TModel[]>;
    updateOne(id: TId, updates: Partial<TModel>): Promise<TModel>;
    updateMany(
        updates: Partial<TModel>,
        ...filters: IFilter[]
    ): Promise<number>;
    deleteOne(id: TId): Promise<boolean>;
    deleteMany(...filters: IFilter[]): Promise<number>;
}

export interface ICrudService<TNewModel, TModel, TId = string>
    extends
        IQueryService<TModel, TId>,
        ICommandService<TNewModel, TModel, TId> {}
