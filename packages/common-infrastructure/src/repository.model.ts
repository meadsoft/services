export interface IQueryRepository<TModel> {
    findById(id: string): Promise<TModel | null>;
    findAll(): Promise<TModel[]>;
}

export interface ICudRepository<TModel> {
    create(item: TModel): Promise<TModel>;
    update(id: string, updates: Partial<TModel>): Promise<TModel>;
    delete(id: string): Promise<boolean>;
}

export interface ICrudRepository<TModel>
    extends IQueryRepository<TModel>, ICudRepository<TModel> {}
