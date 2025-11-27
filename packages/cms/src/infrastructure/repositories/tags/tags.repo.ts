import { Injectable } from '@nestjs/common';
import { Tag } from '@haru-cafe/cms/contracts/tags.model';
import { BaseModelService } from '@haru-cafe/common/repositories/on-creation/on-creation.mapper';
import { PostgresUnitOfWork } from '../../drizzle/postgres/unit-of-work.service.js';
import { DrizzlePgRepository } from '../../drizzle/postgres/repository.service.js';
import { tags } from './tags.table.js';

@Injectable()
export class TagsRepository extends DrizzlePgRepository<Tag> {
    constructor(
        protected unitOfWork: PostgresUnitOfWork,
        protected baseModelService: BaseModelService
    ) {
        super(tags, unitOfWork, baseModelService);
    }
}
