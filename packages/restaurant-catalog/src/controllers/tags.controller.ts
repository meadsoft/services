import { Controller } from '@nestjs/common';
import {
    NewTag,
    NewTagSchema,
    Tag,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-api';
import { ApiTags } from '@nestjs/swagger';

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
export class TagsCommandController extends tagsCommandController {}
