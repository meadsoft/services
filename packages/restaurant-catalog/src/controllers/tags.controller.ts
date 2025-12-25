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
} from '@meadsoft/common-http';
import { ApiTags } from '@nestjs/swagger';
import { TagsCommandService, TagsQueryService } from '../services/tags.service';

const tagsQueryController = createQueryController<Tag>(Tag);

const tagsCommandController = createCommandController<NewTag, Tag>(
    Tag,
    NewTagSchema,
    TagSchema,
);

@ApiTags('Tags')
@Controller('tags')
export class TagsQueryController extends tagsQueryController {
    constructor(service: TagsQueryService) {
        super(service);
    }
}

@ApiTags('Tags')
@Controller('tags')
export class TagsCommandController extends tagsCommandController {
    constructor(service: TagsCommandService) {
        super(service);
    }
}
