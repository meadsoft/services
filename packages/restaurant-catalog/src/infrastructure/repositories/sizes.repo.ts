import { Injectable } from '@nestjs/common';
import {
    BaseModelService,
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@meadsoft/common-infrastructure';
import {
    NewSize,
    Size,
    SizeSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import { sizes } from '../tables/sizes.table';
import { ZodSchema } from '@meadsoft/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class SizesRepository extends DrizzlePgRepository<NewSize, Size> {
    constructor(
        protected override unitOfWork: PostgresUnitOfWork,
        protected override baseModelService: BaseModelService,
    ) {
        super(sizes, new ZodSchema(SizeSchema), unitOfWork, baseModelService);
    }

    override equals(id: string) {
        return eq(sizes.id, id);
    }
}
