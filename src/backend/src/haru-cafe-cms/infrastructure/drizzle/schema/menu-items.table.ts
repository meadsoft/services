import { uuid, varchar, text, decimal, boolean } from 'drizzle-orm/pg-core';
import { haruCafeCmsSchema } from './haru-cafe-cms.schema';
import { onCreationColumns } from './columns/on-creation.columns';

export const MENU_ITEMS_TABLE_NAME = 'menu_items';

export const menuItems = haruCafeCmsSchema.table(MENU_ITEMS_TABLE_NAME, {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    imageUrl: varchar({ length: 512 }),
    price: decimal({ precision: 10, scale: 2 }).notNull(),
    isFavorite: boolean().default(false).notNull(),
    isActive: boolean().default(true).notNull(),
    ...onCreationColumns,
});

export type MenuItem = typeof menuItems.$inferSelect;
export type NewMenuItem = typeof menuItems.$inferInsert;
