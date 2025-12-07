import { Module } from '@nestjs/common';
import {
    DrizzlePgModule,
    InfrastructureModule,
} from '@haru-cafe/common-infrastructure';
import { MenuItemRepository } from './infrastructure/repositories/menu-items.repo';
import { SizesRepository } from './infrastructure/repositories/sizes.repo';
import { TagsRepository } from './infrastructure/repositories/tags.repo';
import { MenuItemsController } from './controllers/menu-items.controller';

@Module({
    imports: [DrizzlePgModule, InfrastructureModule],
    controllers: [MenuItemsController],
    providers: [MenuItemRepository, TagsRepository, SizesRepository],
    exports: [MenuItemRepository, TagsRepository, SizesRepository],
})
export class HaruCafeCmsModule {}
