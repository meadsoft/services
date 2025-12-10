import { Module } from '@nestjs/common';
import {
    DrizzlePgModule,
    InfrastructureModule,
} from '@meadsoft/common-infrastructure';
import { MenuItemRepository } from './infrastructure/repositories/menu-items.repo';
import { SizesRepository } from './infrastructure/repositories/sizes.repo';
import { TagsRepository } from './infrastructure/repositories/tags.repo';
import {
    MenuItemsQueryController,
    MenuItemsCommandController,
} from './controllers/menu-items.controller';
import {
    SizesCommandController,
    SizesQueryController,
} from './controllers/sizes.controller';
import {
    TagsCommandController,
    TagsQueryController,
} from './controllers/tags.controller';

@Module({
    imports: [DrizzlePgModule, InfrastructureModule],
    controllers: [
        MenuItemsQueryController,
        MenuItemsCommandController,
        SizesQueryController,
        SizesCommandController,
        TagsQueryController,
        TagsCommandController,
    ],
    providers: [MenuItemRepository, TagsRepository, SizesRepository],
    exports: [MenuItemRepository, TagsRepository, SizesRepository],
})
export class RestaurantCatalogModule {}
