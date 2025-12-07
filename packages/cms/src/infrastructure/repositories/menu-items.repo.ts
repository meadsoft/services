// menu-item.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseModelService } from '../../common/repositories/on-creation/on-creation.mapper';
import type {
    MenuItem,
    NewMenuItem,
} from '../../../../cms-contracts/src/menu-items.entity';
import { menuItems } from '../tables/menu-items.table';
import { DrizzlePgRepository } from '../drizzle/postgres/repository.service';
import { PostgresUnitOfWork } from '../drizzle/postgres/unit-of-work.service';

@Injectable()
export class MenuItemRepository extends DrizzlePgRepository<
    NewMenuItem,
    MenuItem
> {
    constructor(
        unitOfWork: PostgresUnitOfWork,
        baseModelService: BaseModelService,
    ) {
        super(menuItems, unitOfWork, baseModelService);
    }
}
