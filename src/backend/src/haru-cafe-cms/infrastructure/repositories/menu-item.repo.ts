// menu-item.repository.ts
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { menuItems } from '../drizzle/schema/menu-items.table';
import { DateTime } from 'luxon';
import { IRepository } from './base-repository.model';
import { MenuItem } from '@meadsoft/haru-cafe-cms/contracts/menu-item.model';
import { PostgresUnitOfWork } from '../drizzle/unit-of-work.service';

@Injectable()
export class MenuItemRepository implements IRepository<MenuItem> {
    constructor(private readonly unitOfWork: PostgresUnitOfWork) {}

    async create(
        menuItem: Omit<MenuItem, 'id'>,
        userId: string,
    ): Promise<MenuItem> {
        menuItem.createdBy = userId;
        menuItem.createdDate = DateTime.now();
        menuItem.updatedBy = userId;
        menuItem.updatedDate = DateTime.now();
        const [created] = await this.unitOfWork.db
            .insert(menuItems)
            .values(menuItem)
            .returning();
        return created;
    }

    async findById(id: string): Promise<MenuItem | undefined> {
        const [item] = await this.unitOfWork.db
            .select()
            .from(menuItems)
            .where(eq(menuItems.id, id));
        return item;
    }

    async findAll(): Promise<MenuItem[]> {
        return await this.unitOfWork.db.select().from(menuItems);
    }

    async update(
        id: string,
        updates: Partial<MenuItem>,
        userId: string,
    ): Promise<MenuItem | undefined> {
        const [updated] = await this.unitOfWork.db
            .update(menuItems)
            .set({
                ...updates,
                updatedDate: DateTime.now(),
                updatedBy: userId,
            })
            .where(eq(menuItems.id, id))
            .returning();
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.unitOfWork.db
            .delete(menuItems)
            .where(eq(menuItems.id, id));
        return result.rowCount > 0;
    }
}
