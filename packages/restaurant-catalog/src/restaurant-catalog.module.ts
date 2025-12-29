import { Module } from '@nestjs/common';
import {
    DrizzlePgModule,
    InfrastructureModule,
} from '@meadsoft/common-infrastructure';
import { CommonModule } from '@meadsoft/common';
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
import { MenuItemsToSizesRepository } from './infrastructure/repositories/menu-items-to-sizes.repo';
import { MenuItemsToTagsRepository } from './infrastructure/repositories';
import {
    MenuItemCommandService,
    MenuItemQueryService,
} from './services/menu-item.service';
import { TagsCommandService, TagsQueryService } from './services/tags.service';
import { SizeCommandService, SizeQueryService } from './services/sizes.service';

@Module({
    imports: [DrizzlePgModule, InfrastructureModule, CommonModule],
    controllers: [
        MenuItemsQueryController,
        MenuItemsCommandController,
        SizesQueryController,
        SizesCommandController,
        TagsQueryController,
        TagsCommandController,
    ],
    providers: [
        MenuItemRepository,
        MenuItemQueryService,
        MenuItemCommandService,
        TagsRepository,
        TagsQueryService,
        TagsCommandService,
        SizesRepository,
        SizeQueryService,
        SizeCommandService,
        MenuItemsToSizesRepository,
        MenuItemsToTagsRepository,
    ],
    exports: [
        MenuItemQueryService,
        MenuItemCommandService,
        TagsQueryService,
        TagsCommandService,
        SizeQueryService,
        SizeCommandService,
    ],
})
export class RestaurantCatalogModule {}
