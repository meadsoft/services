import { IFilter } from '@meadsoft/common';
import { Result } from 'ts-results';

export interface IQueryService<TModel, TId = string> {
    findOne(id: TId): Promise<TModel | null>;
    findMany(...filters: IFilter[]): Promise<TModel[]>;
}

export interface ICommandService<TNewModel, TModel, TId = string> {
    createOne(userId: string, item: TNewModel): Promise<Result<TModel, Error>>;
    createMany(
        userId: string,
        ...items: TNewModel[]
    ): Promise<Result<TModel[], Error>>;
    updateOne(
        userId: string,
        id: TId,
        updates: Partial<TModel>,
    ): Promise<Result<TModel, Error>>;
    updateMany(
        userId: string,
        updates: Partial<TModel>,
        ...filters: IFilter[]
    ): Promise<Result<number, Error>>;
    deleteOne(userId: string, id: TId): Promise<Result<boolean, Error>>;
    deleteMany(
        userId: string,
        ...filters: IFilter[]
    ): Promise<Result<number, Error>>;
}

export interface ICrudService<TNewModel, TModel, TId = string>
    extends
        IQueryService<TModel, TId>,
        ICommandService<TNewModel, TModel, TId> {}
