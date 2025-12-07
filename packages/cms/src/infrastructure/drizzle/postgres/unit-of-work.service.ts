import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { UnitOfWork } from '../../../common/repositories/unit-of-work.base';
import { PostgresDbService } from './postgres-db.service';

type DbOrTransaction = NodePgDatabase | PgTransaction<any, any, any>;

@Injectable()
export class PostgresUnitOfWork extends UnitOfWork<
    NodePgDatabase,
    PgTransaction<any, any, any>
> {
    constructor(postgresService: PostgresDbService) {
        super(() => postgresService.getDatabase());
    }

    /**
     * Get current database connection or transaction
     */
    override getDatabase(): DbOrTransaction {
        return this._currentTransaction ?? this._getDb();
    }

    /**
     * Execute work within a transaction
     */
    override async startTransaction<T>(work: () => Promise<T>): Promise<T> {
        return await this._getDb().transaction(async (transaction) => {
            this._currentTransaction = transaction;
            try {
                const result = await work();
                return result;
            } finally {
                this._currentTransaction = undefined;
            }
        });
    }
}
