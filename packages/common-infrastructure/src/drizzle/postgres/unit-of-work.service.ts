import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgQueryResultHKT, PgTransaction } from 'drizzle-orm/pg-core';
import { PostgresDbService } from './postgres-db.service';
import { UnitOfWorkService } from '../../unit-of-work.service';

type DbOrTransaction = NodePgDatabase | PgTransaction<PgQueryResultHKT>;

@Injectable()
export class PostgresUnitOfWork extends UnitOfWorkService<
    NodePgDatabase,
    DbOrTransaction
> {
    constructor(databaseService: PostgresDbService) {
        super(() => databaseService.getDatabase());
    }

    /**
     * Get current database connection or transaction
     */
    override getDatabase(): DbOrTransaction {
        return this.currentTransaction ?? this.getActualDatabase();
    }

    /**
     * Execute work within a transaction
     */
    override async startTransaction<T>(work: () => Promise<T>): Promise<T> {
        return await this.getActualDatabase().transaction(
            async (transaction) => {
                this.currentTransaction = transaction;
                try {
                    const result = await work();
                    return result;
                } finally {
                    transaction.rollback();
                    this.currentTransaction = undefined;
                }
            },
        );
    }
}
