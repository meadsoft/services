import { serial } from 'drizzle-orm/pg-core';
import { haruCafeCmsSchema } from './haru-cafe-cms.schema';
import { menuItems } from './menu-items.table';
import { sizes } from './sizes.table';
import { onCreationColumns } from './columns/on-creation.columns';

export const MENU_ITEMS_TO_SIZES_TABLE_NAME = 'menu_items_to_sizes';

export const menuItemsToSizes = haruCafeCmsSchema.table(
    MENU_ITEMS_TO_SIZES_TABLE_NAME,
    {
        menuItemId: serial()
            .references(() => menuItems.id)
            .notNull(),
        sizeId: serial()
            .references(() => sizes.id)
            .notNull(),
        ...onCreationColumns,
    },
);
