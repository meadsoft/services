import { NotImplementedException } from '@nestjs/common';

export class UnitOfWork<TDb = unknown, TTransaction = unknown> {
    protected _getDb: () => TDb;
    protected _currentTransaction?: TTransaction;

    constructor(getDb: () => TDb) {
        this._getDb = getDb;
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
    startTransaction<T>(_work: () => Promise<T>): Promise<T> {
        throw new NotImplementedException();
    }

    /**
     * Check if currently in a transaction
     */
    isInTransaction(): boolean {
        return this._currentTransaction !== undefined;
    }
}
