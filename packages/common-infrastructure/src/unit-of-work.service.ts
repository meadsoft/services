import { NotImplementedException } from '@nestjs/common';
import { IUnitOfWorkService } from './unit-of-work.schema';

export class UnitOfWorkService<
    TDb = unknown,
    TTransaction = unknown,
> implements IUnitOfWorkService<TDb, TTransaction> {
    protected getActualDatabase: () => TDb;
    protected currentTransaction?: TTransaction;

    constructor(getDatabase: () => TDb) {
        this.getActualDatabase = getDatabase;
    }

    /**
     * Get the current database connection or transaction
     */
    getDatabase(): TDb | TTransaction {
        throw new NotImplementedException();
    }

    /**
     * Execute work within a transaction
     */
    async startTransaction<T>(work: () => Promise<T>): Promise<T> {
        return await work();
    }

    /**
     * Check if currently in a transaction
     */
    isInTransaction(): boolean {
        return this.currentTransaction !== undefined;
    }
}
