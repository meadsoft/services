import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';
import {
    IMenuItem,
    INewMenuItem,
    MenuItem,
    NewMenuItemSchema,
    NewMenuItemWithRelationsSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-http';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { EntityService, SYSTEM_UUID } from '@meadsoft/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { MenuItemService } from 'src/services/menu-item.service';

const menuItemQueryController = createQueryController<IMenuItem>(MenuItem);

const menuItemCommandController = createCommandController<
    IMenuItem,
    INewMenuItem
>(MenuItem, NewMenuItemSchema);

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsQueryController extends menuItemQueryController {
    constructor(service: MenuItemService) {
        super(service);
    }
}

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsCommandController extends menuItemCommandController {
    constructor(repository: MenuItemRepository, entityService: EntityService) {
        const newToPersistent = (newItem: INewMenuItem): IMenuItem => {
            // TODO: add auth and replace SYSTEM_UUID with the actual user ID
            return entityService.create<INewMenuItem>(SYSTEM_UUID, newItem);
        };
        const updater = (item: IMenuItem): IMenuItem => {
            return entityService.update<IMenuItem>(SYSTEM_UUID, item);
        };
        super(repository, newToPersistent, updater);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(NewMenuItemWithRelationsSchema))
    @ApiCreatedResponse({ type: MenuItem })
    async createWithRelations(@Body() newItem: MenuItem): Promise<MenuItem> {
        const item: MenuItem = this.newToPersistent(newItem);
        return await this.service.createOne(item);
    }
}
