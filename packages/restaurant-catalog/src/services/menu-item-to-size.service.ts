import { Injectable } from '@nestjs/common';
import {
    IMenuItemToSize,
    MenuItemToSizeEntity,
} from '@meadsoft/restaurant-catalog-contracts';
import { ChangeHistoryService, EntityService } from '@meadsoft/common';
import { QueryService, CommandService } from '@meadsoft/common-application';
import { MenuItemToSizeRepository } from '../database/repositories';

@Injectable()
export class MenuItemToSizeQueryService extends QueryService<IMenuItemToSize> {
    constructor(repository: MenuItemToSizeRepository) {
        super(repository);
    }
}

@Injectable()
export class MenuItemToSizeCommandService extends CommandService<
    IMenuItemToSize,
    IMenuItemToSize
> {
    constructor(
        repository: MenuItemToSizeRepository,
        entityService: EntityService,
        changeHistoryService: ChangeHistoryService,
    ) {
        super(
            repository,
            entityService,
            changeHistoryService,
            (userId: string, newModel: IMenuItemToSize) =>
                MenuItemToSizeEntity.create(userId, newModel, entityService),
        );
    }
}
