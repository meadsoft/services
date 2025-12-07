import { Controller } from '@nestjs/common';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';
import {
    MenuItem,
    NewMenuItem,
    NewMenuItemSchema,
    MenuItemSchema,
} from '@haru-cafe/cms-contracts';
import { createBaseEntityController } from './base-entity.controller';

const baseMenuItemController = createBaseEntityController<
    MenuItem,
    NewMenuItem
>(new MenuItem(), MenuItemSchema, new NewMenuItem(), NewMenuItemSchema);

@Controller('menu-items')
export class MenuItemsController extends baseMenuItemController<
    MenuItem,
    NewMenuItem
> {
    constructor(repository: MenuItemRepository) {
        super(repository);
    }
}
