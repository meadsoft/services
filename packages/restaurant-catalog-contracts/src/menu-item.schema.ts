import { z } from 'zod';
import { EntitySchema } from './entity.schema';
import { createZodDto } from 'nestjs-zod';
import { DEFAULT_STRING_LENGTH } from '@meadsoft/common';
import type { IChangeHistory } from '@meadsoft/common';

export const MENU_ITEM_IS_FAVORITE_DEFAULT = false;
export const MENU_ITEM_IS_ACTIVE_DEFAULT = false;

export const NewMenuItemSchema = z.object({
    name: z.string().nonempty().max(DEFAULT_STRING_LENGTH),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    price: z.number().nullable(),
    isFavorite: z.boolean().default(MENU_ITEM_IS_FAVORITE_DEFAULT),
    isActive: z.boolean().default(MENU_ITEM_IS_ACTIVE_DEFAULT),
});

export const MenuItemSchema = EntitySchema.extend(NewMenuItemSchema.shape);
export const NewMenuItemJsonSchema = z.toJSONSchema(NewMenuItemSchema);
export const MenuItemJsonSchema = z.toJSONSchema(MenuItemSchema);
export type INewMenuItem = z.infer<typeof NewMenuItemSchema>;
export class NewMenuItem extends createZodDto(NewMenuItemSchema) {}
export type IMenuItem = IChangeHistory & z.infer<typeof MenuItemSchema>;
export class MenuItem
    extends createZodDto(MenuItemSchema)
    implements IChangeHistory {}

export const NewMenuItemWithRelationsSchema = NewMenuItemSchema.extend({
    sizes: z.uuid().array().optional(),
    tags: z.uuid().array().optional(),
});
export type INewMenuItemWithRelations = IMenuItem &
    z.infer<typeof NewMenuItemWithRelationsSchema>;
export class NewMenuItemWithRelations extends createZodDto(
    NewMenuItemWithRelationsSchema,
) {}
