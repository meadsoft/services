import { eq } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { IBaseModel } from '../../../contracts/base.model';
import { BaseModelService } from '../../../common/repositories/on-creation/on-creation.mapper';
import {
    IReadOnlyRepository,
    IRepository,
} from '../../../common/repositories/repository.model';
import { PostgresUnitOfWork } from './unit-of-work.service.js';

export class DrizzlePgReadOnlyRepository<TModel extends IBaseModel>
    implements IReadOnlyRepository<TModel>
{
    constructor(
        protected pgTable: PgTableWithColumns<any>,
        protected unitOfWork: PostgresUnitOfWork,
        protected baseModelService: BaseModelService
    ) {}

    async findById(id: string): Promise<TModel | undefined> {
        const [item] = await this.unitOfWork.db
            .select()
            .from(this.pgTable)
            .where(eq(this.pgTable.id, id));
        return item;
    }

    async findAll(): Promise<TModel[]> {
        return await this.unitOfWork.db.select().from(this.pgTable);
    }
}

export class DrizzlePgRepository<TModel extends IBaseModel>
    extends DrizzlePgReadOnlyRepository<TModel>
    implements IRepository<TModel>
{
    async create(
        menuItem: Omit<TModel, 'id'>,
        userId: string
    ): Promise<TModel> {
        this.baseModelService.addCreationData(menuItem, userId);
        const [created] = await this.unitOfWork.db
            .insert(this.pgTable)
            .values(menuItem)
            .returning();
        return created as TModel;
    }

    async update(
        id: string,
        updates: Partial<TModel>,
        userId: string
    ): Promise<TModel | undefined> {
        this.baseModelService.addUpdateData(updates, userId);
        const [updated] = await this.unitOfWork.db
            .update(this.pgTable)
            .set(updates)
            .where(eq(this.pgTable.id, id))
            .returning();
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.unitOfWork.db
            .delete(this.pgTable)
            .where(eq(this.pgTable.id, id));
        return result.rowCount > 0;
    }
}
