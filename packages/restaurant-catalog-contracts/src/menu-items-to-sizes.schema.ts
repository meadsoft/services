import { ChangeHistorySchema } from '@meadsoft/common';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const MenuItemsToSizesIdSchema = z.object({
    menuItemId: z.uuid(),
    sizeId: z.uuid(),
});

export type IMenuItemsToSizesId = z.infer<typeof MenuItemsToSizesIdSchema>;

export const MenuItemsToSizesSchema = MenuItemsToSizesIdSchema.extend(
    ChangeHistorySchema.shape,
);
export const MenuItemsToSizesJsonSchema = z.toJSONSchema(
    MenuItemsToSizesSchema,
);
export type IMenuItemsToSizes = z.infer<typeof MenuItemsToSizesSchema>;
export class MenuItemsToSizes extends createZodDto(MenuItemsToSizesSchema) {}
