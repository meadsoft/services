import { Module } from '@nestjs/common';
import { HaruCafeCmsConfigProvider } from './cms.config';
import { BaseModelService } from './common/repositories/on-creation/on-creation.mapper';
import { MenuItemRepository } from './infrastructure/repositories/menu-items/menu-items.repo';
import { SizesRepository } from './infrastructure/repositories/sizes/sizes.repo';
import { TagsRepository } from './infrastructure/repositories/tags/tags.repo';
import { MenuItemsController } from './controllers/menu-items.controller';

@Module({
    imports: [],
    controllers: [MenuItemsController],
    providers: [HaruCafeCmsConfigProvider, BaseModelService],
    exports: [
        HaruCafeCmsConfigProvider,
        MenuItemRepository,
        TagsRepository,
        SizesRepository,
    ],
})
export class HaruCafeCmsModule {}
