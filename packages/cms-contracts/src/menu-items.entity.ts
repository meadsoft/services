import { z } from 'zod';
import { BaseModelSchema } from './base.entity';
import { createZodDto } from 'nestjs-zod';

export const MENU_ITEM_IS_FAVORITE_DEFAULT = false;
export const MENU_ITEM_IS_ACTIVE_DEFAULT = false;

export const NewMenuItemSchema = z.object({
    name: z.string().min(1).max(1000),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    price: z.number().nullable(),
    isFavorite: z.boolean().default(MENU_ITEM_IS_FAVORITE_DEFAULT),
    isActive: z.boolean().default(MENU_ITEM_IS_ACTIVE_DEFAULT),
});

export const MenuItemSchema = BaseModelSchema.extend(NewMenuItemSchema.shape);
export const NewMenuItemJsonSchema = z.toJSONSchema(NewMenuItemSchema);
export const MenuItemJsonSchema = z.toJSONSchema(MenuItemSchema);
export class NewMenuItem extends createZodDto(NewMenuItemSchema) {}
export class MenuItem extends createZodDto(MenuItemSchema) {}
