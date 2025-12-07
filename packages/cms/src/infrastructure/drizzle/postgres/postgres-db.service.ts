import { Injectable } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
import { HaruCafeCmsConfig } from '../../../cms.config';

@Injectable()
export class PostgresDbService {
    // private pool: Pool;
    private _db: NodePgDatabase | null = null;

    constructor(private readonly haruCafeCmsConfig: HaruCafeCmsConfig) {
        // for some reason, when using the pool the client is undefined
        // this.pool = new Pool({
        //     connectionString: this.haruCafeCmsConfig.DATABASE_URL,
        //     max: 20,
        //     idleTimeoutMillis: 30000,
        //     connectionTimeoutMillis: 2000,
        // });
    }

    getDatabase() {
        if (!this._db) {
            this._db = drizzle(this.haruCafeCmsConfig.DATABASE_URL);
            // for some reason, when using the pool the client is undefined
            // this._db = drizzle({ client: this.pool });
        }
        return this._db;
    }

    // async onModuleDestroy() {
    //     await this.pool.end();
    // }
}
