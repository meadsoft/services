import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { UnitOfWork } from '@haru-cafe/common/repositories/unit-of-work.base';
import { PostgresDbService } from './postgres-db.service.js';

type DbOrTransaction = NodePgDatabase | PgTransaction<any, any, any>;

@Injectable()
export class PostgresUnitOfWork extends UnitOfWork<
    NodePgDatabase,
    PgTransaction<any, any, any>
> {
    constructor(postgresService: PostgresDbService) {
        super(postgresService.db);
    }

    /**
     * Get current database connection or transaction
     */
    get db(): DbOrTransaction {
        return this._currentTransaction ?? this._mainDb;
    }

    /**
     * Execute work within a transaction
     */
    async transaction<T>(work: () => Promise<T>): Promise<T> {
        return await this._mainDb.transaction(async (tx) => {
            this._currentTransaction = tx;
            try {
                const result = await work();
                return result;
            } finally {
                this._currentTransaction = undefined;
            }
        });
    }
}
