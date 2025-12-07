import { Module } from '@nestjs/common';
import { HaruCafeCmsConfigProvider } from '../../cms.config';
import { PostgresUnitOfWork } from './postgres/unit-of-work.service';
import { PostgresDbService } from './postgres/postgres-db.service';

export const HaruCafeDrizzlePgProviders = [
    HaruCafeCmsConfigProvider,
    PostgresUnitOfWork,
    PostgresDbService,
];

export const HaruCafeDrizzlePgExports = [PostgresUnitOfWork, PostgresDbService];

@Module({
    providers: HaruCafeDrizzlePgProviders,
    exports: HaruCafeDrizzlePgExports,
})
export class HaruCafeDrizzlePgModule {}
