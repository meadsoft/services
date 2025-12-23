import { Injectable } from '@nestjs/common';
import { Tag, TagSchema } from '@meadsoft/restaurant-catalog-contracts';
import {
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@meadsoft/common-infrastructure';
import { tags } from '../tables/tags.table';
import { ZodSchema } from '@meadsoft/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class TagsRepository extends DrizzlePgRepository<Tag> {
    constructor(protected override unitOfWork: PostgresUnitOfWork) {
        super(tags, new ZodSchema(TagSchema), unitOfWork);
    }

    override equals(id: string) {
        return eq(tags.id, id);
    }
}
