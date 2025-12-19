import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { entityColumns } from '@meadsoft/common-infrastructure';
import { menuItemsToSizes } from './menu-items-to-sizes.table';

export const SIZE_TABLE_NAME = 'sizes';

export const sizes = pgTable(SIZE_TABLE_NAME, {
    ...entityColumns,
    name: varchar({ length: 255 }).notNull(),
});

export const sizesRelations = relations(sizes, ({ many }) => ({
    menuItemsToSizes: many(menuItemsToSizes),
}));
