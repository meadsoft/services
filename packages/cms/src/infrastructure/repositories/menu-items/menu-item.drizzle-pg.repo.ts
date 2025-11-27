import { MenuItem } from '@haru-cafe/cms/contracts/menu-items.model';
import { BaseModelService } from '@haru-cafe/common/repositories/on-creation/on-creation.mapper';
import { menuItems } from './menu-items.table.js';
import { PostgresUnitOfWork } from '../../drizzle/postgres/unit-of-work.service.js';
import { DrizzlePgRepository } from '../../drizzle/postgres/repository.service.js';

export class MenuItemsDrizzlePgRepository extends DrizzlePgRepository<MenuItem> {
    constructor(
        unitOfWork: PostgresUnitOfWork,
        baseModelService: BaseModelService
    ) {
        super(menuItems, unitOfWork, baseModelService);
    }
}
