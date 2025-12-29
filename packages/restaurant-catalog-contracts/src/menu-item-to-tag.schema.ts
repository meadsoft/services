import { EntitySchema } from '@meadsoft/common';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const MenuItemToTagSchema = EntitySchema.extend({
    menuItemId: z.uuid(),
    tagId: z.uuid(),
});
export const MenuItemToTagJsonSchema = z.toJSONSchema(MenuItemToTagSchema);
export type IMenuItemToTag = z.infer<typeof MenuItemToTagSchema>;
export class MenuItemToTag extends createZodDto(MenuItemToTagSchema) {}
