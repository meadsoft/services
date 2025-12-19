import { Injectable } from '@nestjs/common';
import { NewTag, Tag, TagSchema } from '@meadsoft/restaurant-catalog-contracts';
import {
    BaseModelService,
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@meadsoft/common-infrastructure';
import { tags } from '../tables/tags.table';
import { ZodSchema } from '@meadsoft/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class TagsRepository extends DrizzlePgRepository<NewTag, Tag> {
    constructor(
        protected override unitOfWork: PostgresUnitOfWork,
        protected override baseModelService: BaseModelService,
    ) {
        super(tags, new ZodSchema(TagSchema), unitOfWork, baseModelService);
    }

    override equals(id: string) {
        return eq(tags.id, id);
    }
}
