import { NotImplementedException } from '@nestjs/common';

export class UnitOfWork<TDb = unknown, TTransaction = unknown> {
    protected _mainDb: TDb;
    protected _currentTransaction?: TTransaction;

    constructor(mainDb: TDb) {
        this._mainDb = mainDb;
    }

    /**
     * Get the current database connection or transaction
     */
    get db(): TDb | TTransaction {
        throw new NotImplementedException();
    }

    /**
     * Execute work within a transaction
     */
    transaction<T>(_work: () => Promise<T>): Promise<T> {
        throw new NotImplementedException();
    }

    /**
     * Check if currently in a transaction
     */
    isInTransaction(): boolean {
        return this._currentTransaction !== undefined;
    }
}
