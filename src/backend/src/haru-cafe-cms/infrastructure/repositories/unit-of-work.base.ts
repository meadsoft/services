export abstract class UnitOfWork<TDb, TTransaction> {
    protected _mainDb: TDb;
    protected _currentTransaction?: TTransaction;

    constructor(mainDb: TDb) {
        this._mainDb = mainDb;
    }

    /**
     * Get the current database connection or transaction
     */
    abstract get db(): TDb | TTransaction;

    /**
     * Execute work within a transaction
     */
    abstract transaction<T>(work: () => Promise<T>): Promise<T>;

    /**
     * Check if currently in a transaction
     */
    isInTransaction(): boolean {
        return this._currentTransaction !== undefined;
    }
}
