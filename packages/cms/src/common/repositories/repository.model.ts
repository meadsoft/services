import { IBaseModel } from '../../contracts/base.model.js';

export interface IReadOnlyRepository<TModel extends IBaseModel> {
    findById(id: string): Promise<TModel | undefined>;
    findAll(): Promise<TModel[]>;
}

export interface IRepository<TModel extends IBaseModel>
    extends IReadOnlyRepository<TModel> {
    create(item: Omit<TModel, 'id'>, userId: string): Promise<TModel>;
    update(
        id: string,
        updates: Partial<TModel>,
        userId: string
    ): Promise<TModel | undefined>;
    delete(id: string): Promise<boolean>;
}
