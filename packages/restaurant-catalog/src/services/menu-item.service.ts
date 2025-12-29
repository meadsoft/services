import { Injectable } from '@nestjs/common';
import {
    IMenuItem,
    INewMenuItem,
    MenuItemEntity,
} from '@meadsoft/restaurant-catalog-contracts';
import { ChangeHistoryService, EntityService } from '@meadsoft/common';
import { QueryService, CommandService } from '@meadsoft/common-application';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';

@Injectable()
export class MenuItemQueryService extends QueryService<IMenuItem> {
    constructor(repository: MenuItemRepository) {
        super(repository);
    }
}

@Injectable()
export class MenuItemCommandService extends CommandService<
    INewMenuItem,
    IMenuItem
> {
    constructor(
        repository: MenuItemRepository,
        entityService: EntityService,
        changeHistoryService: ChangeHistoryService,
    ) {
        super(
            repository,
            entityService,
            changeHistoryService,
            (userId: string, newModel: INewMenuItem) =>
                MenuItemEntity.create(userId, newModel, entityService),
        );
    }
}
