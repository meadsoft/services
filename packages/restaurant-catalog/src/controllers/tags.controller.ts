import { Controller } from '@nestjs/common';
import { NewTag, Tag, TagSchema } from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-http';
import { ApiTags } from '@nestjs/swagger';
import { TagsRepository } from '../infrastructure/repositories/tags.repo';

const tagsQueryController = createQueryController<Tag>(Tag);

const tagsCommandController = createCommandController<NewTag, Tag>(
    Tag,
    TagSchema,
);

@ApiTags('Tags')
@Controller('tags')
export class TagsQueryController extends tagsQueryController {}

@ApiTags('Tags')
@Controller('tags')
export class TagsCommandController extends tagsCommandController {
    constructor(repository: TagsRepository) {
        super(repository);
    }
}
