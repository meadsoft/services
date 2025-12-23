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
import { EntityService } from '@meadsoft/common';
import { MenuItemsToSizesRepository } from './infrastructure/repositories/menu-items-to-sizes.repo';
import { MenuItemsToTagsRepository } from './infrastructure/repositories';

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
    providers: [
        EntityService,
        MenuItemRepository,
        TagsRepository,
        SizesRepository,
        MenuItemsToSizesRepository,
        MenuItemsToTagsRepository,
    ],
    exports: [MenuItemRepository, TagsRepository, SizesRepository],
})
export class RestaurantCatalogModule {}
