import {
    CREATED_BY_DEFAULT,
    UPDATED_BY_DEFAULT,
} from '../../../contracts/on-creation.model';
import { uuid } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core/columns';

export const createdDate = timestamp().defaultNow();
export const updatedDate = timestamp().defaultNow();
export const createdById = uuid().default(CREATED_BY_DEFAULT).notNull();
export const updatedById = uuid().default(UPDATED_BY_DEFAULT).notNull();

export const onCreationColumns = {
    createdDate,
    updatedDate,
    createdById,
    updatedById,
};
