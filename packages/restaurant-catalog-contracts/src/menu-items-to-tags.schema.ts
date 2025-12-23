import { ChangeHistorySchema } from '@meadsoft/common';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const MenuItemsToTagsIdSchema = z.object({
    menuItemId: z.uuid(),
    tagId: z.uuid(),
});

export type IMenuItemsToTagsId = z.infer<typeof MenuItemsToTagsIdSchema>;

export const MenuItemsToTagsSchema = MenuItemsToTagsIdSchema.extend(
    ChangeHistorySchema.shape,
);
export const MenuItemsToTagsJsonSchema = z.toJSONSchema(MenuItemsToTagsSchema);
export type IMenuItemsToTags = z.infer<typeof MenuItemsToTagsSchema>;
export class MenuItemsToTags extends createZodDto(MenuItemsToTagsSchema) {}
