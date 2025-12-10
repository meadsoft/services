// menu-item.repository.ts
import { Injectable } from '@nestjs/common';
import {
    BaseModelService,
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@meadsoft/common-infrastructure';
import type {
    MenuItem,
    NewMenuItem,
} from '@meadsoft/restaurant-catalog-contracts';
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
