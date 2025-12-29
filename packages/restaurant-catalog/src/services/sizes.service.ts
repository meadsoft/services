import { Injectable } from '@nestjs/common';
import { ChangeHistoryService, EntityService } from '@meadsoft/common';
import { QueryService, CommandService } from '@meadsoft/common-application';
import {
    INewSize,
    ISize,
    SizeEntity,
} from '@meadsoft/restaurant-catalog-contracts';
import { SizesRepository } from '../infrastructure/repositories';

@Injectable()
export class SizeQueryService extends QueryService<ISize> {
    constructor(repository: SizesRepository) {
        super(repository);
    }
}

@Injectable()
export class SizeCommandService extends CommandService<INewSize, ISize> {
    constructor(
        repository: SizesRepository,
        entityService: EntityService,
        changeHistoryService: ChangeHistoryService,
    ) {
        super(
            repository,
            entityService,
            changeHistoryService,
            (userId: string, newModel: INewSize) =>
                SizeEntity.create(userId, newModel, entityService),
        );
    }
}
