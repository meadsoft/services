import { uuid, varchar } from 'drizzle-orm/pg-core';
import { haruCafeCmsSchema } from './haru-cafe-cms.schema';
import { onCreationColumns } from './columns/on-creation.columns';

export const SIZE_TABLE_NAME = 'sizes';

export const sizes = haruCafeCmsSchema.table(SIZE_TABLE_NAME, {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    ...onCreationColumns,
});
