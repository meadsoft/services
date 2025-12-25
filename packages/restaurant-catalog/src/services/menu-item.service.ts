import { Injectable } from '@nestjs/common';
import {
    IMenuItem,
    IMenuItemsToSizes,
    IMenuItemsToSizesId,
    INewMenuItem,
    INewMenuItemWithRelations,
    MenuItemEntity,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    EMPTY_LENGTH,
    ChangeHistoryService,
    ICrudService,
    EntityService,
} from '@meadsoft/common';
import { QueryService, CommandService } from '@meadsoft/common-application';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';

import {
    MenuItemsToSizesRepository,
    MenuItemsToTagsRepository,
} from '../infrastructure/repositories';
import { menuItemsToSizes } from '../infrastructure/tables/menu-items-to-sizes.table';
import { eq } from 'drizzle-orm';
import { menuItemsToTags } from '../infrastructure/tables/menu-items-to-tags.table';

@Injectable()
export class MenuItemQueryService extends QueryService<IMenuItem> {
    constructor(repository: MenuItemRepository) {
        super(repository);
    }
}

@Injectable()
export class MenuItemCrudService
    extends CommandService<INewMenuItem, IMenuItem>
    implements ICrudService<INewMenuItem, IMenuItem>
{
    constructor(
        repository: MenuItemRepository,
        entityService: EntityService,
        changeHistoryService: ChangeHistoryService,
        private readonly menuItemsToSizesRepository: MenuItemsToSizesRepository,
        private readonly menuItemsToTagsRepository: MenuItemsToTagsRepository,
    ) {
        super(
            repository,
            entityService,
            changeHistoryService,
            (userId: string, newModel: INewMenuItem) =>
                MenuItemEntity.create(userId, newModel, entityService),
        );
    }

    async createWithRelations(
        userId: string,
        item: INewMenuItemWithRelations,
    ): Promise<IMenuItem> {
        const created = await this.repository.createOne(item);
        if (item.sizes && item.sizes.length > EMPTY_LENGTH) {
            await this.upsertSizeRelationships(userId, created.id, item.sizes);
        }
        if (item.tags && item.tags.length > EMPTY_LENGTH) {
            await this.insertTagRelations(userId, created.id, item.tags);
        }
        return created;
    }

    async updateWithRelations(
        id: string,
        updates: INewMenuItemWithRelations,
    ): Promise<IMenuItem> {
        const updated = await this.repository.updateOne(id, updates);

        if (updates.sizes !== undefined) {
            await this.menuItemsToSizesRepository.deleteMany(
                eq(menuItemsToSizes.menuItemId, id),
            );
            if (updates.sizes.length > EMPTY_LENGTH) {
                await this.upsertSizeRelationships(id, updates.sizes);
            }
        }

        if (updates.tags !== undefined) {
            await this.menuItemsToTagsRepository.deleteMany(
                eq(menuItemsToTags.menuItemId, id),
            );
            if (updates.tags.length > EMPTY_LENGTH) {
                await this.insertTagRelations(id, updates.tags);
            }
        }

        return updated;
    }

    private async upsertSizeRelationships(
        userId: string,
        menuItemId: string,
        sizeIds: string[],
    ): Promise<IMenuItemsToSizes[]> {
        const menuItemToSizeRelationships: IMenuItemsToSizes[] =
            sizeIds.map<IMenuItemsToSizes>((sizeId) => {
                return this.changeHistoryService.create<IMenuItemsToSizesId>(
                    userId,
                    {
                        menuItemId,
                        sizeId,
                    },
                );
            });
        return await this.menuItemsToSizesRepository.createMany(
            menuItemToSizeRelationships,
        );
    }

    private async insertTagRelations(
        userId: string,
        menuItemId: string,
        tagIds: string[],
    ): Promise<void> {
        const now = new Date().toISOString();
        const relations = tagIds.map((tagId) => ({
            menuItemId,
            tagId,
            createdDate: now,
            createdById: null,
        }));

        await this.menuItemsToTagsRepository.createMany(...relations);
    }
}
