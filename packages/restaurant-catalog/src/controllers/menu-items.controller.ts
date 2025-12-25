import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';
import {
    IMenuItem,
    INewMenuItem,
    MenuItem,
    MenuItemSchema,
    NewMenuItemWithRelationsSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-http';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { MenuItemCrudService } from 'src/services/menu-item.service';
import { SYSTEM_UUID } from '@meadsoft/common';

const menuItemQueryController = createQueryController<IMenuItem>(MenuItem);

const menuItemCommandController = createCommandController<
    INewMenuItem,
    IMenuItem
>(MenuItem, MenuItemSchema);

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsQueryController extends menuItemQueryController {
    constructor(service: MenuItemCrudService) {
        super(service);
    }
}

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsCommandController extends menuItemCommandController {
    constructor(repository: MenuItemRepository) {
        super(repository);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(NewMenuItemWithRelationsSchema))
    @ApiCreatedResponse({ type: MenuItem })
    async createWithRelations(@Body() item: MenuItem): Promise<MenuItem> {
        return await this.service.createOne(SYSTEM_UUID, item);
    }
}
