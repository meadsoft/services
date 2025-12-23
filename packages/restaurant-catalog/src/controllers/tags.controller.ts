import { Controller } from '@nestjs/common';
import {
    INewTag,
    ITag,
    NewTag,
    NewTagSchema,
    Tag,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-http';
import { ApiTags } from '@nestjs/swagger';
import { EntityService, SYSTEM_UUID } from '@meadsoft/common';
import { TagsRepository } from '../infrastructure/repositories/tags.repo';

const tagsQueryController = createQueryController<Tag>(Tag);

const tagsCommandController = createCommandController<Tag, NewTag>(
    Tag,
    NewTagSchema,
);

@ApiTags('Tags')
@Controller('tags')
export class TagsQueryController extends tagsQueryController {}

@ApiTags('Tags')
@Controller('tags')
export class TagsCommandController extends tagsCommandController {
    constructor(repository: TagsRepository, entityService: EntityService) {
        const newToPersistent = (newItem: INewTag): ITag => {
            return entityService.create<INewTag>(SYSTEM_UUID, newItem);
        };
        const updater = (item: ITag): ITag => {
            return entityService.update<ITag>(SYSTEM_UUID, item);
        };
        super(repository, newToPersistent, updater);
    }
}
