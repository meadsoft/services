import { Controller } from '@nestjs/common';
import {
    IMenuItem,
    INewMenuItem,
    MenuItem,
    MenuItemSchema,
    NewMenuItemSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-http';
import { ApiTags } from '@nestjs/swagger';
import {
    MenuItemCommandService,
    MenuItemQueryService,
} from 'src/services/menu-item.service';

const menuItemQueryController = createQueryController<IMenuItem>(MenuItem);

const menuItemCommandController = createCommandController<
    INewMenuItem,
    IMenuItem
>(MenuItem, NewMenuItemSchema, MenuItemSchema);

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsQueryController extends menuItemQueryController {
    constructor(service: MenuItemQueryService) {
        super(service);
    }
}

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsCommandController extends menuItemCommandController {
    constructor(service: MenuItemCommandService) {
        super(service);
    }
}
