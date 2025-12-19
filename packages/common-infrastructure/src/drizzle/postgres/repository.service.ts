import { SQL } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { EMPTY_LENGTH, FIRST_INDEX, Schema } from '@meadsoft/common';
import { IQueryRepository, ICrudRepository } from '../../repository.model';
import { PostgresUnitOfWork } from './unit-of-work.service';
import { QueryResultBase } from 'pg';

export abstract class DrizzlePgEntityQueryRepository<
    TModel extends object,
> implements IQueryRepository<TModel> {
    constructor(
        protected pgTable: PgTable,
        protected schema: Schema<TModel>,
        protected unitOfWork: PostgresUnitOfWork,
    ) {}

    abstract equals(id: string): SQL;

    protected parseResults(item: unknown): TModel {
        const result = this.schema.parse(item);
        if (result.err) {
            throw result.val;
        }
        return result.val;
    }

    async findById(id: string): Promise<TModel | null> {
        const items = await this.unitOfWork
            .getDatabase()
            .select()
            .from(this.pgTable)
            .where(this.equals(id));
        if (items.length === EMPTY_LENGTH) {
            return null;
        }
        return this.parseResults(items[FIRST_INDEX]);
    }

    async findAll(): Promise<TModel[]> {
        const items = await this.unitOfWork
            .getDatabase()
            .select()
            .from(this.pgTable);
        const results: TModel[] = [];
        for (const item of items) {
            const result = this.schema.parse(item);
            if (result.err) {
                throw result.val;
            }
            results.push(result.val);
        }
        return results;
    }

    async exists(id: string): Promise<boolean> {
        const items = await this.unitOfWork
            .getDatabase()
            .select()
            .from(this.pgTable)
            .where(this.equals(id));
        return items.length > EMPTY_LENGTH;
    }
}

export abstract class DrizzlePgCommandRepository<TModel extends object>
    extends DrizzlePgEntityQueryRepository<TModel>
    implements ICrudRepository<TModel>
{
    async create(item: TModel): Promise<TModel> {
        const created = await this.unitOfWork
            .getDatabase()
            .insert(this.pgTable)
            .values(item)
            .returning();
        return this.parseResults(created[FIRST_INDEX]);
    }

    async update(id: string, updates: Partial<TModel>): Promise<TModel> {
        const updated = await this.unitOfWork
            .getDatabase()
            .update(this.pgTable)
            .set(updates)
            .where(this.equals(id))
            .returning();
        return this.parseResults(updated[FIRST_INDEX]);
    }

    async delete(id: string): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        const result = (await this.unitOfWork
            .getDatabase()
            .delete(this.pgTable)
            .where(this.equals(id))) as QueryResultBase;
        return result.rowCount === null
            ? false
            : result.rowCount > EMPTY_LENGTH;
    }
}
