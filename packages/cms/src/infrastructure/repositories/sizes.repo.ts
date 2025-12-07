import { Injectable } from '@nestjs/common';
import {
    BaseModelService,
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@haru-cafe/common-infrastructure';
import { NewSize, Size } from '../../../../cms-contracts/src/sizes.entity';
import { sizes } from '../tables/sizes.table';

@Injectable()
export class SizesRepository extends DrizzlePgRepository<NewSize, Size> {
    constructor(
        protected override unitOfWork: PostgresUnitOfWork,
        protected override baseModelService: BaseModelService,
    ) {
        super(sizes, unitOfWork, baseModelService);
    }
}
