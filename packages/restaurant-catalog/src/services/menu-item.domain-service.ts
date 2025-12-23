import { Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@meadsoft/common-application';
import {
    IMenuItem,
    MenuItemEntity,
    NewMenuItem,
} from '@meadsoft/restaurant-catalog-contracts';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';

@Injectable()
export class MenuItemDomainService {
    constructor(
        private readonly repository: MenuItemRepository,
        private readonly eventPublisher: DomainEventPublisher,
    ) {}

    async create(newMenuItem: NewMenuItem, userId: string): Promise<IMenuItem> {
        const menuItem = MenuItemEntity.create(newMenuItem, userId);
        if (menuItem.err) {
            throw menuItem.val;
        }
        const savedMenuItem = await this.repository.createOne(menuItem.val);
        await this.eventPublisher.publishAll(menuItem.val.getDomainEvents());
        menuItem.val.clearDomainEvents();
        return savedMenuItem;
    }

    async update(
        id: string,
        menuItemUpdates: IMenuItem,
        userId: string,
    ): Promise<IMenuItem | null> {
        const existingData = await this.repository.findOne(id);
        if (!existingData) {
            return null;
        }
        const menuItem = MenuItemEntity.reconstitute(existingData);
        if (menuItem.err) {
            throw menuItem.val;
        }
        menuItem.val.update(menuItemUpdates, userId);
        const updatedMenuItem = await this.repository.updateOne(
            id,
            menuItemUpdates,
        );
        await this.eventPublisher.publishAll(menuItem.val.getDomainEvents());
        menuItem.val.clearDomainEvents();
        return updatedMenuItem;
    }
}
