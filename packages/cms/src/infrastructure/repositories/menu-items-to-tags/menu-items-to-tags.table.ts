import { relations } from 'drizzle-orm';
import { uuid } from 'drizzle-orm/pg-core';
import { onCreationColumns } from '../../../common/repositories/on-creation/on-creation.columns';
import { haruCafeCmsSchema } from '../../../common/repositories/haru-cafe-cms.schema';
import { menuItems } from '../menu-items/menu-items.table.js';
import { tags } from '../tags/tags.table.js';

export const MENU_ITEMS_TO_TAGS_TABLE_NAME = 'menu_items_to_tags';

export const menuItemsToTags = haruCafeCmsSchema.table(
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
