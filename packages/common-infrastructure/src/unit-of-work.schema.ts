export interface IUnitOfWorkService<TDb = unknown, TTransaction = unknown> {
    /**
     * Get the current database connection or transaction
     */
    getDatabase(): TDb | TTransaction;
    /**
     * Execute work within a transaction
     */
    startTransaction<T>(work: () => Promise<T>): Promise<T>;
    /**
     * Check if currently in a transaction
     */
    isInTransaction(): boolean;
}
