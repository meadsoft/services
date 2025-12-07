import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { onCreationColumns } from '@haru-cafe/common-infrastructure';
import { menuItemsToTags } from './menu-items-to-tags.table';

export const TAGS_TABLE_NAME = 'tags';

export const tags = pgTable(TAGS_TABLE_NAME, {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    ...onCreationColumns,
});

export const tagsRelations = relations(tags, ({ many }) => ({
    menuItemsToTags: many(menuItemsToTags),
}));
