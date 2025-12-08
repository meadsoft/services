import { Test, TestingModule } from '@nestjs/testing';
import { HaruCafeCmsModule } from './cms.module';
import { MenuItemRepository } from './infrastructure/repositories/menu-items.repo';
import { SizesRepository } from './infrastructure/repositories/sizes.repo';
import { TagsRepository } from './infrastructure/repositories/tags.repo';
import {
    MenuItemsQueryController,
    MenuItemsCommandController,
} from './controllers/menu-items.controller';
import { InfrastructureConfig } from '@haru-cafe/common-infrastructure';
import {
    SizesCommandController,
    SizesQueryController,
} from './controllers/sizes.controller';
import {
    TagsCommandController,
    TagsQueryController,
} from './controllers/tags.controller';

describe('HaruCafeCmsModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [HaruCafeCmsModule],
        })
            .overrideProvider(InfrastructureConfig)
            .useValue(new InfrastructureConfig(''))
            .compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should provide InfrastructureConfig', () => {
        const config = module.get<InfrastructureConfig>(InfrastructureConfig);
        expect(config).toBeDefined();
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

    it('should provide MenuItemsQueryController', () => {
        const controller = module.get<MenuItemsQueryController>(
            MenuItemsQueryController,
        );
        expect(controller).toBeDefined();
    });

    it('should provide MenuItemsCommandController', () => {
        const controller = module.get<MenuItemsCommandController>(
            MenuItemsCommandController,
        );
        expect(controller).toBeDefined();
    });

    it('should provide MenuItemsQueryController', () => {
        const controller = module.get<MenuItemsQueryController>(
            MenuItemsQueryController,
        );
        expect(controller).toBeDefined();
    });

    it('should provide MenuItemsCommandController', () => {
        const controller = module.get<MenuItemsCommandController>(
            MenuItemsCommandController,
        );
        expect(controller).toBeDefined();
    });

    it('should provide SizesQueryController', () => {
        const controller =
            module.get<SizesQueryController>(SizesQueryController);
        expect(controller).toBeDefined();
    });

    it('should provide SizesCommandController', () => {
        const controller = module.get<SizesCommandController>(
            SizesCommandController,
        );
        expect(controller).toBeDefined();
    });

    it('should provide TagsQueryController', () => {
        const controller = module.get<TagsQueryController>(TagsQueryController);
        expect(controller).toBeDefined();
    });

    it('should provide TagsCommandController', () => {
        const controller = module.get<TagsCommandController>(
            TagsCommandController,
        );
        expect(controller).toBeDefined();
    });
});
