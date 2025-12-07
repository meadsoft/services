import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { onCreationColumns } from '../../common/repositories/on-creation/on-creation.columns';
import { menuItems } from './menu-items.table';
import { tags } from './tags.table';

export const MENU_ITEMS_TO_TAGS_TABLE_NAME = 'menu_items_to_tags';

export const menuItemsToTags = pgTable(
    MENU_ITEMS_TO_TAGS_TABLE_NAME,
    {
        menuItemId: uuid()
            .references(() => menuItems.id)
            .notNull(),
        tagId: uuid()
            .references(() => tags.id)
            .notNull(),
        ...onCreationColumns,
    }
);

export const menuItemsToTagsRelations = relations(
    menuItemsToTags,
    ({ one }) => ({
        menuItems: one(menuItems, {
            fields: [menuItemsToTags.menuItemId],
            references: [menuItems.id],
        }),
        tags: one(tags, {
            fields: [menuItemsToTags.tagId],
            references: [tags.id],
        }),
    })
);
