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
} from '@meadsoft/common-api';
import { ApiTags } from '@nestjs/swagger';
import { EntityService } from '@meadsoft/common';
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
            return entityService.create<INewTag>('system', newItem);
        };
        const updater = (item: ITag): ITag => {
            return entityService.update<ITag>('system', item);
        };
        super(repository, newToPersistent, updater);
    }
}
