import { Injectable, NotImplementedException } from '@nestjs/common';
import {
    IMenuItem,
    INewMenuItemWithRelations,
} from '@meadsoft/restaurant-catalog-contracts';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';
import {
    EMPTY_LENGTH,
    ChangeHistoryService,
    ICrudService,
    IFilter,
} from '@meadsoft/common';
import {
    MenuItemsToSizesRepository,
    MenuItemsToTagsRepository,
    SizesRepository,
    TagsRepository,
} from '../infrastructure/repositories';
import { menuItemsToSizes } from 'src/infrastructure/tables/menu-items-to-sizes.table';
import { eq } from 'drizzle-orm';
import { menuItemsToTags } from 'src/infrastructure/tables/menu-items-to-tags.table';

@Injectable()
export class MenuItemService implements ICrudService<IMenuItem> {
    constructor(
        private readonly repository: MenuItemRepository,
        private readonly tagsRepository: TagsRepository,
        private readonly sizesRepository: SizesRepository,
        private readonly menuItemsToSizesRepository: MenuItemsToSizesRepository,
        private readonly menuItemsToTagsRepository: MenuItemsToTagsRepository,
        private readonly changeHistoryService: ChangeHistoryService,
    ) {}
    async findOne(id: string): Promise<IMenuItem | null> {
        return await this.repository.findOne(id);
    }
    async findMany(...filters: IFilter[]): Promise<IMenuItem[]> {
        return await this.repository.findMany(...filters);
    }
    async createOne(item: IMenuItem): Promise<IMenuItem> {
        return await this.repository.createOne(item);
    }
    async createMany(...items: IMenuItem[]): Promise<IMenuItem[]> {
        return await this.repository.createMany(...items);
    }
    async updateOne(
        id: string,
        updates: Partial<IMenuItem>,
    ): Promise<IMenuItem> {
        return await this.repository.updateOne(id, updates);
    }
    async updateMany(): Promise<number> {
        return await Promise.reject(new NotImplementedException());
    }
    async deleteOne(id: string): Promise<boolean> {
        return await this.repository.deleteOne(id);
    }
    async deleteMany(): Promise<number> {
        return await Promise.reject(new NotImplementedException());
    }

    async createWithRelations(
        item: INewMenuItemWithRelations,
    ): Promise<IMenuItem> {
        const created = await this.repository.createOne(item);
        if (item.sizes && item.sizes.length > EMPTY_LENGTH) {
            await this.insertSizeRelations(created.id, item.sizes);
        }
        if (item.tags && item.tags.length > EMPTY_LENGTH) {
            await this.insertTagRelations(created.id, item.tags);
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
                await this.insertSizeRelations(id, updates.sizes);
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

    private async insertSizeRelations(
        menuItemId: string,
        sizeIds: string[],
    ): Promise<void> {
        const now = new Date().toISOString();
        const relations = sizeIds.map((sizeId) => ({
            menuItemId,
            sizeId,
            createdDate: now,
            createdById: null,
        }));

        await this.menuItemsToSizesRepository.createOne(relations);
    }

    private async insertTagRelations(
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

        await this.unitOfWork
            .getDatabase()
            .insert(menuItemsToTags)
            .values(relations);
    }
}
