import { Injectable } from '@nestjs/common';
import { BaseModelService } from '@haru-cafe/common/repositories/on-creation/on-creation.mapper';
import { Size } from '@haru-cafe/cms/contracts/sizes.model';
import { sizes } from './sizes.table.js';
import { PostgresUnitOfWork } from '../../drizzle/postgres/unit-of-work.service.js';
import { DrizzlePgRepository } from '../../drizzle/postgres/repository.service.js';

@Injectable()
export class SizesRepository extends DrizzlePgRepository<Size> {
    constructor(
        protected unitOfWork: PostgresUnitOfWork,
        protected baseModelService: BaseModelService
    ) {
        super(sizes, unitOfWork, baseModelService);
    }
}
