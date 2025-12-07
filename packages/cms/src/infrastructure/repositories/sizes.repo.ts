import { Injectable } from '@nestjs/common';
import { BaseModelService } from '../../common/repositories/on-creation/on-creation.mapper';
import { NewSize, Size } from '../../../../cms-contracts/src/sizes.entity';
import { sizes } from '../tables/sizes.table';
import { PostgresUnitOfWork } from '../drizzle/postgres/unit-of-work.service';
import { DrizzlePgRepository } from '../drizzle/postgres/repository.service';

@Injectable()
export class SizesRepository extends DrizzlePgRepository<NewSize, Size> {
    constructor(
        protected override unitOfWork: PostgresUnitOfWork,
        protected override baseModelService: BaseModelService,
    ) {
        super(sizes, unitOfWork, baseModelService);
    }
}
