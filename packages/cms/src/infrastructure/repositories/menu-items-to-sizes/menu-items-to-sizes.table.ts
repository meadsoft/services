import { relations } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';
import { haruCafeCmsSchema } from '../../../common/repositories/haru-cafe-cms.schema';
import { onCreationColumns } from '../../../common/repositories/on-creation/on-creation.columns';
import { menuItems } from '../menu-items/menu-items.table.js';
import { sizes } from '../sizes/sizes.table.js';

export const MENU_ITEMS_TO_SIZES_TABLE_NAME = 'menu_items_to_sizes';

export const menuItemsToSizes = haruCafeCmsSchema.table(
    MENU_ITEMS_TO_SIZES_TABLE_NAME,
    {
        menuItemId: uuid()
            .references(() => menuItems.id)
            .notNull(),
        sizeId: uuid()
            .references(() => sizes.id)
            .notNull(),
        ...onCreationColumns,
    }
);

export const menuItemsToSizesRelations = relations(
    menuItemsToSizes,
    ({ one }) => ({
        menuItems: one(menuItems, {
            fields: [menuItemsToSizes.menuItemId],
            references: [menuItems.id],
        }),
        sizes: one(sizes, {
            fields: [menuItemsToSizes.sizeId],
            references: [sizes.id],
        }),
    })
);
