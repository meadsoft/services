import { Injectable } from '@nestjs/common';
import {
    DrizzlePgCommandRepository,
    PostgresUnitOfWork,
} from '@meadsoft/common-infrastructure';
import { ZodSchema } from '@meadsoft/common';
import { and, eq } from 'drizzle-orm';
import {
    IMenuItemsToTags,
    IMenuItemsToTagsId,
    MenuItemsToTagsSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import { menuItemsToTags } from '../tables/menu-items-to-tags.table';

@Injectable()
export class MenuItemsToTagsRepository extends DrizzlePgCommandRepository<
    IMenuItemsToTags,
    IMenuItemsToTagsId
> {
    constructor(protected override unitOfWork: PostgresUnitOfWork) {
        super(
            menuItemsToTags,
            new ZodSchema(MenuItemsToTagsSchema),
            unitOfWork,
        );
    }

    override equals(id: IMenuItemsToTagsId) {
        return and(
            eq(menuItemsToTags.menuItemId, id.menuItemId),
            eq(menuItemsToTags.tagId, id.tagId),
        );
    }
}
