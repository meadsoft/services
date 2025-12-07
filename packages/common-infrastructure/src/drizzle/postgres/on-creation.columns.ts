import { uuid } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core/columns';

export const createdDate = timestamp().defaultNow();
export const updatedDate = timestamp().defaultNow();
export const createdById = uuid();
export const updatedById = uuid();

export const onCreationColumns = {
    createdDate,
    updatedDate,
    createdById,
    updatedById,
};
