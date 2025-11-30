import { uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { haruCafeCmsSchema } from '../../../common/repositories/haru-cafe-cms.schema';
import { onCreationColumns } from '../../../common/repositories/on-creation/on-creation.columns';
import { menuItemsToTags } from '../menu-items-to-tags/menu-items-to-tags.table.js';

export const TAGS_TABLE_NAME = 'tags';

export const tags = haruCafeCmsSchema.table(TAGS_TABLE_NAME, {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    ...onCreationColumns,
});

export const tagsRelations = relations(tags, ({ many }) => ({
    menuItemsToTags: many(menuItemsToTags),
}));
