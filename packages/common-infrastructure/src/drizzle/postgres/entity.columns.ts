import { uuid } from 'drizzle-orm/pg-core';
import { onCreationColumns } from './on-creation.columns';

export const id = uuid().defaultRandom().primaryKey();

export const entityColumns = {
    id,
    ...onCreationColumns,
};
