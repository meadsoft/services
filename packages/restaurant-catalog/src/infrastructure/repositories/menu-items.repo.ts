// menu-item.repository.ts
import { Injectable } from '@nestjs/common';
import {
    DrizzlePgRepository,
    PostgresUnitOfWork,
} from '@meadsoft/common-infrastructure';
import {
    MenuItemSchema,
    type MenuItem,
} from '@meadsoft/restaurant-catalog-contracts';
import { menuItems } from '../tables/menu-items.table';
import { ZodSchema } from '@meadsoft/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class MenuItemRepository extends DrizzlePgRepository<MenuItem> {
    constructor(unitOfWork: PostgresUnitOfWork) {
        super(menuItems, new ZodSchema(MenuItemSchema), unitOfWork);
    }

    override equals(id: string) {
        return eq(menuItems.id, id);
    }
}
