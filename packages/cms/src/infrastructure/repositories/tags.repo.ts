import { Injectable } from '@nestjs/common';
import { NewTag, Tag } from '../../../../cms-contracts/src/tags.entity';
import {
    BaseModelService,
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@haru-cafe/common-infrastructure';
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
