import { uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { haruCafeCmsSchema } from '../../../common/repositories/haru-cafe-cms.schema';
import { onCreationColumns } from '../../../common/repositories/on-creation/on-creation.columns';
import { menuItemsToSizes } from '../menu-items-to-sizes/menu-items-to-sizes.table.js';

export const SIZE_TABLE_NAME = 'sizes';

export const sizes = haruCafeCmsSchema.table(SIZE_TABLE_NAME, {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    ...onCreationColumns,
});

export const sizesRelations = relations(sizes, ({ many }) => ({
    menuItemsToSizes: many(menuItemsToSizes),
}));
