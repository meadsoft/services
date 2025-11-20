import { uuid, varchar } from 'drizzle-orm/pg-core';
import { haruCafeCmsSchema } from './haru-cafe-cms.schema';
import { onCreationColumns } from './columns/on-creation.columns';

export const TAGS_TABLE_NAME = 'tags';

export const tags = haruCafeCmsSchema.table(TAGS_TABLE_NAME, {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    ...onCreationColumns,
});
