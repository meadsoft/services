import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { entityColumns } from '@meadsoft/common-infrastructure';
import { menuItemsToTags } from './menu-items-to-tags.table';

export const TAGS_TABLE_NAME = 'tags';

export const tags = pgTable(TAGS_TABLE_NAME, {
    ...entityColumns,
    name: varchar({ length: 255 }).notNull(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
    menuItemsToTags: many(menuItemsToTags),
}));
