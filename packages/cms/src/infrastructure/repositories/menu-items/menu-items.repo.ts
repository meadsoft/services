// menu-item.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseModelService } from '../../../common/repositories/on-creation/on-creation.mapper';
import { MenuItem } from '../../../contracts/menu-items.model';
import { menuItems } from './menu-items.table.js';
import { DrizzlePgRepository } from '../../drizzle/postgres/repository.service.js';
import { PostgresUnitOfWork } from '../../drizzle/postgres/unit-of-work.service.js';

@Injectable()
export class MenuItemRepository extends DrizzlePgRepository<MenuItem> {
    constructor(
        unitOfWork: PostgresUnitOfWork,
        baseModelService: BaseModelService
    ) {
        super(menuItems, unitOfWork, baseModelService);
    }
}
