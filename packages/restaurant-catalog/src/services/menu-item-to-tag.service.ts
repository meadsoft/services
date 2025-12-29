import { Injectable } from '@nestjs/common';
import {
    IMenuItemToTag,
    MenuItemToTagEntity,
} from '@meadsoft/restaurant-catalog-contracts';
import { ChangeHistoryService, EntityService } from '@meadsoft/common';
import { QueryService, CommandService } from '@meadsoft/common-application';
import { MenuItemToTagRepository } from '../database/repositories';

@Injectable()
export class MenuItemToTagQueryService extends QueryService<IMenuItemToTag> {
    constructor(repository: MenuItemToTagRepository) {
        super(repository);
    }
}

@Injectable()
export class MenuItemToTagCommandService extends CommandService<
    IMenuItemToTag,
    IMenuItemToTag
> {
    constructor(
        repository: MenuItemToTagRepository,
        entityService: EntityService,
        changeHistoryService: ChangeHistoryService,
    ) {
        super(
            repository,
            entityService,
            changeHistoryService,
            (userId: string, newModel: IMenuItemToTag) =>
                MenuItemToTagEntity.create(userId, newModel, entityService),
        );
    }
}
