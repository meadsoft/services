import { EntitySchema } from '@meadsoft/common';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const MenuItemToSizeSchema = EntitySchema.extend({
    menuItemId: z.uuid(),
    sizeId: z.uuid(),
});
export const MenuItemToSizeJsonSchema = z.toJSONSchema(MenuItemToSizeSchema);
export type IMenuItemToSize = z.infer<typeof MenuItemToSizeSchema>;
export class MenuItemToSize extends createZodDto(MenuItemToSizeSchema) {}
