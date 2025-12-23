import { Controller } from '@nestjs/common';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';
import {
    IMenuItem,
    INewMenuItem,
    MenuItem,
    NewMenuItem,
    NewMenuItemSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-api';
import { ApiTags } from '@nestjs/swagger';
import { EntityService } from '@meadsoft/common';

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
    constructor(repository: MenuItemRepository, entityService: EntityService) {
        const newToPersistent = (newItem: INewMenuItem): IMenuItem => {
            return entityService.create<INewMenuItem>('system', newItem);
        };
        const updater = (item: IMenuItem): IMenuItem => {
            return entityService.update<IMenuItem>('system', item);
        };
        super(repository, newToPersistent, updater);
    }
}
