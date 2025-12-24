import { IFilter } from '@meadsoft/common';

export interface IQueryService<TModel, TId = string> {
    findOne(id: TId): Promise<TModel | null>;
    findMany(...filters: IFilter[]): Promise<TModel[]>;
}

export interface ICommandService<
    TNewModel extends object,
    TModel,
    TId = string,
> {
    createOne(userId: string, item: TNewModel): Promise<TModel>;
    createMany(userId: string, ...items: TNewModel[]): Promise<TModel[]>;
    updateOne(
        userId: string,
        id: TId,
        updates: Partial<TModel>,
    ): Promise<TModel>;
    updateMany(
        userId: string,
        updates: Partial<TModel>,
        ...filters: IFilter[]
    ): Promise<number>;
    deleteOne(userId: string, id: TId): Promise<boolean>;
    deleteMany(userId: string, ...filters: IFilter[]): Promise<number>;
}

export interface ICrudService<TNewModel extends object, TModel, TId = string>
    extends
        IQueryService<TModel, TId>,
        ICommandService<TNewModel, TModel, TId> {}
