import { Injectable } from '@nestjs/common';
import { BaseModelService } from '../../../common/repositories/on-creation/on-creation.mapper';
import { Size } from '../../../contracts/sizes.model';
import { sizes } from './sizes.table.js';
import { PostgresUnitOfWork } from '../../drizzle/postgres/unit-of-work.service.js';
import { DrizzlePgRepository } from '../../drizzle/postgres/repository.service.js';

@Injectable()
export class SizesRepository extends DrizzlePgRepository<Size> {
    constructor(
        protected override unitOfWork: PostgresUnitOfWork,
        protected override baseModelService: BaseModelService
    ) {
        super(sizes, unitOfWork, baseModelService);
    }
}
