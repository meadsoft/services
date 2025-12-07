import { Injectable } from '@nestjs/common';
import { NewTag, Tag } from '../../../../cms-contracts/src/tags.entity';
import { BaseModelService } from '../../common/repositories/on-creation/on-creation.mapper';
import { PostgresUnitOfWork } from '../drizzle/postgres/unit-of-work.service';
import { DrizzlePgRepository } from '../drizzle/postgres/repository.service';
import { tags } from '../tables/tags.table';

@Injectable()
export class TagsRepository extends DrizzlePgRepository<NewTag, Tag> {
    constructor(
        protected override unitOfWork: PostgresUnitOfWork,
        protected override baseModelService: BaseModelService,
    ) {
        super(tags, unitOfWork, baseModelService);
    }
}
