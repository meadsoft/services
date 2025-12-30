import { SQL } from 'drizzle-orm';

export interface IQueryRepository<TModel = unknown, TId = string> {
    countRows(...filters: SQL[]): Promise<number>;
    findOne(id: TId): Promise<TModel | null>;
    findMany(...filters: SQL[]): Promise<TModel[]>;
}

export interface ICommandRepository<TModel = unknown, TId = string> {
    createOne(item: TModel): Promise<TModel>;
    createMany(...items: TModel[]): Promise<TModel[]>;
    updateOne(id: TId, updates: Partial<TModel>): Promise<TModel>;
    updateMany(updates: Partial<TModel>, ...filters: SQL[]): Promise<number>;
    deleteOne(id: TId): Promise<boolean>;
    deleteMany(...filters: SQL[]): Promise<number>;
}

export interface ICrudRepository<TModel, TId = string>
    extends IQueryRepository<TModel, TId>, ICommandRepository<TModel, TId> {}
