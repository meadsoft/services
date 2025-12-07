import { Module } from '@nestjs/common';
import { PostgresUnitOfWork } from './postgres/unit-of-work.service';
import { PostgresDbService } from './postgres/postgres-db.service';
import { InfrastructureProvider } from '../infrastructure.config';

@Module({
    providers: [PostgresUnitOfWork, PostgresDbService, InfrastructureProvider],
    exports: [PostgresUnitOfWork, PostgresDbService],
})
export class DrizzlePgModule {}
