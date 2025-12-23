import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { menuItems } from './menu-items.table';
import { sizes } from './sizes.table';
import { changeHistoryColumns } from '@meadsoft/common-infrastructure';

export const MENU_ITEMS_TO_SIZES_TABLE_NAME = 'menu_items_to_sizes';

export const menuItemsToSizes = pgTable(MENU_ITEMS_TO_SIZES_TABLE_NAME, {
    menuItemId: uuid()
        .references(() => menuItems.id, {
            onDelete: 'cascade',
            onUpdate: 'cascade',
        })
        .notNull(),
    sizeId: uuid()
        .references(() => sizes.id, {
            onDelete: 'cascade',
            onUpdate: 'cascade',
        })
        .notNull(),
    ...changeHistoryColumns,
});

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
    }),
);
