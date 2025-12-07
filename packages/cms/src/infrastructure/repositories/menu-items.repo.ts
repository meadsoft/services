// menu-item.repository.ts
import { Injectable } from '@nestjs/common';
import {
    BaseModelService,
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@haru-cafe/common-infrastructure';
import type {
    MenuItem,
    NewMenuItem,
} from '../../../../cms-contracts/src/menu-items.entity';
import { menuItems } from '../tables/menu-items.table';

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
