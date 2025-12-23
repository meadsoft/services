import { uuid } from 'drizzle-orm/pg-core';
import { changeHistoryColumns } from './change-history.columns';

export const id = uuid().defaultRandom().primaryKey();

export const entityColumns = {
    id,
    ...changeHistoryColumns,
};
