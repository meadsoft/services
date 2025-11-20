import { HaruCafeCmsConfig } from '@meadsoft/haru-cafe-cms/haru-cafe-cms.config';
import { Injectable } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class PostgresService {
    constructor(private readonly haruCafeCmsConfig: HaruCafeCmsConfig) {}

    getDb(): NodePgDatabase {
        return drizzle(this.haruCafeCmsConfig.databaseUrl);
    }
}
