import { Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@meadsoft/common-domain';
import {
    IMenuItem,
    MenuItemEntity,
    NewMenuItem,
} from '@meadsoft/restaurant-catalog-contracts';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';

@Injectable()
export class MenuItemService {
    constructor(
        private readonly repository: MenuItemRepository,
        private readonly eventPublisher: DomainEventPublisher,
    ) {}

    async create(newMenuItem: NewMenuItem, userId: string): Promise<IMenuItem> {
        const menuItem = MenuItemEntity.create(newMenuItem, userId);
        if (menuItem.err) {
            throw menuItem.val;
        }
        const savedMenuItem = await this.repository.create(menuItem.val);
        await this.eventPublisher.publishAll(menuItem.val.getDomainEvents());
        menuItem.val.clearDomainEvents();
        return savedMenuItem;
    }

    async update(
        id: string,
        menuItemUpdates: IMenuItem,
        userId: string,
    ): Promise<IMenuItem | null> {
        const existingData = await this.repository.findById(id);
        if (!existingData) {
            return null;
        }
        const menuItem = MenuItemEntity.reconstitute(existingData);
        if (menuItem.err) {
            throw menuItem.val;
        }
        menuItem.val.update(menuItemUpdates, userId);
        const updatedMenuItem = await this.repository.update(
            id,
            menuItemUpdates,
        );
        await this.eventPublisher.publishAll(menuItem.val.getDomainEvents());
        menuItem.val.clearDomainEvents();
        return updatedMenuItem;
    }
}
