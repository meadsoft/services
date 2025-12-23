import { Injectable } from '@nestjs/common';
import {
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@meadsoft/common-infrastructure';
import { Size, SizeSchema } from '@meadsoft/restaurant-catalog-contracts';
import { sizes } from '../tables/sizes.table';
import { ZodSchema } from '@meadsoft/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class SizesRepository extends DrizzlePgRepository<Size> {
    constructor(protected override unitOfWork: PostgresUnitOfWork) {
        super(sizes, new ZodSchema(SizeSchema), unitOfWork);
    }

    override equals(id: string) {
        return eq(sizes.id, id);
    }
}
