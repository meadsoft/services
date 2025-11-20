import { text } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core/columns';

export const createdDate = timestamp().defaultNow();
export const updatedDate = timestamp().defaultNow();
export const createdBy = text().default('system');
export const updatedBy = text().default('system');

export const onCreationColumns = {
    createdDate,
    updatedDate,
    createdBy,
    updatedBy,
};
