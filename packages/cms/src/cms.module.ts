import { Module } from '@nestjs/common';
import { HaruCafeCmsConfigProvider } from './cms.config';
import { BaseModelService } from './common/repositories/on-creation/on-creation.mapper';
import { MenuItemRepository } from './infrastructure/repositories/menu-items.repo';
import { SizesRepository } from './infrastructure/repositories/sizes.repo';
import { TagsRepository } from './infrastructure/repositories/tags.repo';
import { MenuItemsController } from './controllers/menu-items.controller';
import { HaruCafeDrizzlePgModule } from './infrastructure/drizzle/drizzle.module';

export const HaruCafeCmsControllers = [MenuItemsController];
export const HaruCafeCmsProviders = [
    HaruCafeCmsConfigProvider,
    BaseModelService,
    MenuItemRepository,
    TagsRepository,
    SizesRepository,
];
export const HaruCafeCmsExports = [
    HaruCafeCmsConfigProvider,
    MenuItemRepository,
    TagsRepository,
    SizesRepository,
];

@Module({
    imports: [HaruCafeDrizzlePgModule],
    controllers: HaruCafeCmsControllers,
    providers: HaruCafeCmsProviders,
    exports: HaruCafeCmsExports,
})
export class HaruCafeCmsModule {}
