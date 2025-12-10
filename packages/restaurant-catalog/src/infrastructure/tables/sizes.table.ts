import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { onCreationColumns } from '@meadsoft/common-infrastructure';
import { menuItemsToSizes } from './menu-items-to-sizes.table';

export const SIZE_TABLE_NAME = 'sizes';

export const sizes = pgTable(SIZE_TABLE_NAME, {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    ...onCreationColumns,
});

export const sizesRelations = relations(sizes, ({ many }) => ({
    menuItemsToSizes: many(menuItemsToSizes),
}));
