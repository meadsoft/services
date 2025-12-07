import { eq } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { BaseCmsModel } from '../../../../../cms-contracts/src/base.entity';
import { BaseModelService } from '../../../common/repositories/on-creation/on-creation.mapper';
import {
    IReadOnlyRepository,
    IRepository,
} from '../../../common/repositories/repository.model';
import { PostgresUnitOfWork } from './unit-of-work.service';

export class DrizzlePgReadOnlyRepository<
    TModel extends BaseCmsModel,
> implements IReadOnlyRepository<TModel> {
    constructor(
        protected pgTable: PgTableWithColumns<any>,
        protected unitOfWork: PostgresUnitOfWork,
        protected baseModelService: BaseModelService,
    ) {}

    async findById(id: string): Promise<TModel | null> {
        const [item] = await this.unitOfWork
            .getDatabase()
            .select()
            .from(this.pgTable)
            .where(eq(this.pgTable.id, id));
        return item ?? null;
    }

    async findAll(): Promise<TModel[]> {
        return await this.unitOfWork.getDatabase().select().from(this.pgTable);
    }

    async exists(id: string): Promise<boolean> {
        const [item] = await this.unitOfWork
            .getDatabase()
            .select()
            .from(this.pgTable)
            .where(eq(this.pgTable.id, id));
        return item !== undefined;
    }
}

export class DrizzlePgRepository<
    TNewModel extends object,
    TModel extends BaseCmsModel,
>
    extends DrizzlePgReadOnlyRepository<TModel>
    implements IRepository<TNewModel, TModel>
{
    async create(menuItem: TNewModel, userId: string): Promise<TModel> {
        this.baseModelService.addCreationData(menuItem, userId);
        const [created] = await this.unitOfWork
            .getDatabase()
            .insert(this.pgTable)
            .values(menuItem)
            .returning();
        return created as TModel;
    }

    async update(
        id: string,
        updates: Partial<TModel>,
        userId: string,
    ): Promise<TModel | undefined> {
        this.baseModelService.addUpdateData(updates, userId);
        const [updated] = await this.unitOfWork
            .getDatabase()
            .update(this.pgTable)
            .set(updates)
            .where(eq(this.pgTable.id, id))
            .returning();
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.unitOfWork
            .getDatabase()
            .delete(this.pgTable)
            .where(eq(this.pgTable.id, id));
        return result.rowCount > 0;
    }
}
