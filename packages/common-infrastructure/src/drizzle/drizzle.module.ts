import { Module } from '@nestjs/common';
import { PostgresUnitOfWork } from './postgres/unit-of-work.service';
import { PostgresDbService } from './postgres/postgres-db.service';
import { InfrastructureProvider } from '../infrastructure.config';
import { UnitOfWorkService } from '../unit-of-work.service';

@Module({
    providers: [
        InfrastructureProvider,
        PostgresUnitOfWork,
        { provide: UnitOfWorkService, useExisting: PostgresUnitOfWork },
        PostgresDbService,
    ],
    exports: [
        InfrastructureProvider,
        PostgresUnitOfWork,
        PostgresDbService,
        UnitOfWorkService,
    ],
})
export class DrizzlePgModule {}
