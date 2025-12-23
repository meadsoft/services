import { Injectable } from '@nestjs/common';
import {
    DrizzlePgCommandRepository,
    PostgresUnitOfWork,
} from '@meadsoft/common-infrastructure';
import { ZodSchema } from '@meadsoft/common';
import { and, eq } from 'drizzle-orm';
import {
    IMenuItemsToSizes,
    IMenuItemsToSizesId,
    MenuItemsToSizesSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import { menuItemsToSizes } from '../tables/menu-items-to-sizes.table';

@Injectable()
export class MenuItemsToSizesRepository extends DrizzlePgCommandRepository<
    IMenuItemsToSizes,
    IMenuItemsToSizesId
> {
    constructor(protected override unitOfWork: PostgresUnitOfWork) {
        super(
            menuItemsToSizes,
            new ZodSchema(MenuItemsToSizesSchema),
            unitOfWork,
        );
    }

    override equals(id: IMenuItemsToSizesId) {
        return and(
            eq(menuItemsToSizes.menuItemId, id.menuItemId),
            eq(menuItemsToSizes.sizeId, id.sizeId),
        );
    }
}
