import { Controller } from '@nestjs/common';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';
import {
    MenuItem,
    NewMenuItem,
    NewMenuItemSchema,
    MenuItemSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-api';
import { ApiTags } from '@nestjs/swagger';

const menuItemQueryController = createQueryController<MenuItem>(
    new MenuItem(),
    MenuItemSchema,
);

const menuItemCommandController = createCommandController<
    MenuItem,
    NewMenuItem
>(new MenuItem(), MenuItemSchema, new NewMenuItem(), NewMenuItemSchema);

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsQueryController extends menuItemQueryController<MenuItem> {
    constructor(repository: MenuItemRepository) {
        super(repository);
    }
}

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsCommandController extends menuItemCommandController<
    MenuItem,
    NewMenuItem
> {
    constructor(repository: MenuItemRepository) {
        super(repository);
    }
}
