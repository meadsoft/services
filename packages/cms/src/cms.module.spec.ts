import { Test, TestingModule } from '@nestjs/testing';
import { HaruCafeCmsModule } from './cms.module';
import { HaruCafeCmsConfig } from './cms.config';
import { BaseModelService } from './common/repositories/on-creation/on-creation.mapper';
import { MenuItemRepository } from './infrastructure/repositories/menu-items.repo';
import { SizesRepository } from './infrastructure/repositories/sizes.repo';
import { TagsRepository } from './infrastructure/repositories/tags.repo';
import { MenuItemsController } from './controllers/menu-items.controller';
import { PostgresDbService } from './infrastructure/drizzle/postgres/postgres-db.service';
import { PostgresUnitOfWork } from './infrastructure/drizzle/postgres/unit-of-work.service';

describe('HaruCafeCmsModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [HaruCafeCmsModule],
        })
            .overrideProvider(HaruCafeCmsConfig)
            .useValue(new HaruCafeCmsConfig(''))
            .compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should provide HaruCafeCmsConfigProvider', () => {
        const config = module.get<HaruCafeCmsConfig>(HaruCafeCmsConfig);
        expect(config).toBeDefined();
    });

    it('should provide PostgresUnitOfWork', () => {
        const service = module.get<PostgresUnitOfWork>(PostgresUnitOfWork);
        expect(service).toBeDefined();
    });

    it('should provide PostgresDbService', () => {
        const service = module.get<PostgresDbService>(PostgresDbService);
        expect(service).toBeDefined();
    });

    it('should provide BaseModelService', () => {
        const service = module.get<BaseModelService>(BaseModelService);
        expect(service).toBeDefined();
    });

    it('should provide MenuItemRepository', () => {
        const repository = module.get<MenuItemRepository>(MenuItemRepository);
        expect(repository).toBeDefined();
    });

    it('should provide TagsRepository', () => {
        const repository = module.get<TagsRepository>(TagsRepository);
        expect(repository).toBeDefined();
    });

    it('should provide SizesRepository', () => {
        const repository = module.get<SizesRepository>(SizesRepository);
        expect(repository).toBeDefined();
    });

    it('should provide MenuItemsController', () => {
        const controller = module.get<MenuItemsController>(MenuItemsController);
        expect(controller).toBeDefined();
    });
});
