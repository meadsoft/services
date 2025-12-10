import { Injectable } from '@nestjs/common';
import { NewTag, Tag } from '@meadsoft/restaurant-catalog-contracts';
import {
    BaseModelService,
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@meadsoft/common-infrastructure';
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
