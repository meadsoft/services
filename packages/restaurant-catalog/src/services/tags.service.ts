import { Injectable } from '@nestjs/common';
import {
    ChangeHistoryService,
    ICommandService,
    EntityService,
} from '@meadsoft/common';
import { QueryService, CommandService } from '@meadsoft/common-application';
import {
    INewTag,
    ITag,
    TagEntity,
} from '@meadsoft/restaurant-catalog-contracts';
import { TagsRepository } from '../infrastructure/repositories';

@Injectable()
export class TagsQueryService extends QueryService<ITag> {
    constructor(repository: TagsRepository) {
        super(repository);
    }
}

@Injectable()
export class TagsCommandService
    extends CommandService<INewTag, ITag>
    implements ICommandService<INewTag, ITag>
{
    constructor(
        repository: TagsRepository,
        entityService: EntityService,
        changeHistoryService: ChangeHistoryService,
    ) {
        super(
            repository,
            entityService,
            changeHistoryService,
            (userId: string, newModel: INewTag) =>
                TagEntity.create(userId, newModel, entityService),
        );
    }
}
