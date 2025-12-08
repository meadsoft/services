import { uuid } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core/columns';

export const createdDate = timestamp({
    mode: 'string',
    withTimezone: true,
}).defaultNow();
export const updatedDate = timestamp({
    mode: 'string',
    withTimezone: true,
}).defaultNow();
export const createdById = uuid();
export const updatedById = uuid();

export const onCreationColumns = {
    createdDate,
    updatedDate,
    createdById,
    updatedById,
};
