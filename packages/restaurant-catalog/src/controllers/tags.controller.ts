import { Controller } from '@nestjs/common';
import {
    NewTag,
    NewTagSchema,
    Tag,
    TagSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-api';
import { TagsRepository } from '../infrastructure/repositories/tags.repo';
import { ApiTags } from '@nestjs/swagger';

const tagsQueryController = createQueryController<Tag>(new Tag(), TagSchema);

const tagsCommandController = createCommandController<Tag, NewTag>(
    new Tag(),
    TagSchema,
    new NewTag(),
    NewTagSchema,
);

@ApiTags('Tags')
@Controller('tags')
export class TagsQueryController extends tagsQueryController<Tag> {
    constructor(repository: TagsRepository) {
        super(repository);
    }
}

@ApiTags('Tags')
@Controller('tags')
export class TagsCommandController extends tagsCommandController<Tag, NewTag> {
    constructor(repository: TagsRepository) {
        super(repository);
    }
}
