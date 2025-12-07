import {
    uuid,
    varchar,
    text,
    decimal,
    boolean,
    pgTable,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { onCreationColumns } from '@haru-cafe/common-infrastructure';
import {
    MENU_ITEM_IS_ACTIVE_DEFAULT,
    MENU_ITEM_IS_FAVORITE_DEFAULT,
} from '../../../../cms-contracts/src/menu-items.entity';
import { menuItemsToTags } from './menu-items-to-tags.table';

export const MENU_ITEMS_TABLE_NAME = 'menu_items';

export const menuItems = pgTable(MENU_ITEMS_TABLE_NAME, {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    imageUrl: varchar({ length: 512 }),
    price: decimal<'number'>({ precision: 10, scale: 2 }),
    isFavorite: boolean().default(MENU_ITEM_IS_FAVORITE_DEFAULT).notNull(),
    isActive: boolean().default(MENU_ITEM_IS_ACTIVE_DEFAULT).notNull(),
    ...onCreationColumns,
});

export const menuItemsRelations = relations(menuItems, ({ many }) => ({
    menuItemsToTags: many(menuItemsToTags),
    sizes: many(menuItemsToTags),
}));
