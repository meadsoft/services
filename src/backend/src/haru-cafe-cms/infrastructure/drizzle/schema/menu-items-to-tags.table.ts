import { serial } from 'drizzle-orm/pg-core';
import { haruCafeCmsSchema } from './haru-cafe-cms.schema';
import { menuItems } from './menu-items.table';
import { tags } from './tags.table';
import { onCreationColumns } from './columns/on-creation.columns';

export const MENU_ITEMS_TO_TAGS_TABLE_NAME = 'menu_items_to_tags';

export const menuItemsToTags = haruCafeCmsSchema.table(
    MENU_ITEMS_TO_TAGS_TABLE_NAME,
    {
        menuItemId: serial()
            .references(() => menuItems.id)
            .notNull(),
        tagId: serial()
            .references(() => tags.id)
            .notNull(),
        ...onCreationColumns,
    },
);
