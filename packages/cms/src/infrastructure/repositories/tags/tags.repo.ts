import { Injectable } from '@nestjs/common';
import { Tag } from '../../../contracts/tags.model';
import { BaseModelService } from '../../../common/repositories/on-creation/on-creation.mapper';
import { PostgresUnitOfWork } from '../../drizzle/postgres/unit-of-work.service.js';
import { DrizzlePgRepository } from '../../drizzle/postgres/repository.service.js';
import { tags } from './tags.table.js';

@Injectable()
export class TagsRepository extends DrizzlePgRepository<Tag> {
    constructor(
        protected override unitOfWork: PostgresUnitOfWork,
        protected override baseModelService: BaseModelService
    ) {
        super(tags, unitOfWork, baseModelService);
    }
}
