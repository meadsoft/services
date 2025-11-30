import { HaruCafeCmsConfig } from '../../../cms.config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Injectable()
export class PostgresDbService implements OnModuleInit {
    private pool!: Pool;
    public db!: NodePgDatabase;

    constructor(private readonly haruCafeCmsConfig: HaruCafeCmsConfig) {}

    async onModuleInit() {
        this.pool = new Pool({
            connectionString: this.haruCafeCmsConfig.databaseUrl,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
        this.db = drizzle(this.pool);
    }

    async onModuleDestroy() {
        await this.pool.end();
    }
}
