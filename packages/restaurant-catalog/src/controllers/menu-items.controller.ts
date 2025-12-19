import { Controller } from '@nestjs/common';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';
import {
    MenuItem,
    NewMenuItem,
    NewMenuItemSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-api';
import { ApiTags } from '@nestjs/swagger';
import { ChangeHistoryService } from '@meadsoft/common';

const menuItemQueryController = createQueryController<MenuItem>(MenuItem);

const menuItemCommandController = createCommandController<
    MenuItem,
    NewMenuItem
>(MenuItem, NewMenuItemSchema);

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsQueryController extends menuItemQueryController {
    constructor(repository: MenuItemRepository) {
        super(repository);
    }
}

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsCommandController extends menuItemCommandController {
    constructor(
        repository: MenuItemRepository,
        onCreationService: ChangeHistoryService,
    ) {
        super(repository);
    }
}
