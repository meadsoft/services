import { AggregateRoot } from '@meadsoft/common-domain';
import { v4 as uuidv4 } from 'uuid';
import { MenuItemCreatedEvent } from './events/menu-item-created.event';
import { MenuItemUpdatedEvent } from './events/menu-item-updated.event';
import { IMenuItem, NewMenuItem } from '../menu-item.schema';
import { EMPTY_LENGTH } from '@meadsoft/common';
import { Err, Ok, Result } from 'ts-results';

export class MenuItemEntity extends AggregateRoot implements IMenuItem {
    public name!: string;
    public description!: string | null;
    public imageUrl!: string | null;
    public price!: number | null;
    public isFavorite!: boolean;
    public isActive!: boolean;

    // Factory method for creating a new menu item
    public static create(
        newMenuItem: NewMenuItem,
        userId: string,
    ): Result<MenuItemEntity, Error> {
        const menuItem = new MenuItemEntity();

        if (
            !newMenuItem.name ||
            newMenuItem.name.trim().length === EMPTY_LENGTH
        ) {
            return Err(new Error('Menu item name cannot be empty'));
        }

        if (newMenuItem.price !== null && newMenuItem.price < EMPTY_LENGTH) {
            return Err(new Error('Menu item price cannot be negative'));
        }

        menuItem.id = uuidv4();
        menuItem.name = newMenuItem.name;
        menuItem.description = newMenuItem.description;
        menuItem.imageUrl = newMenuItem.imageUrl;
        menuItem.price = newMenuItem.price;
        menuItem.isFavorite = newMenuItem.isFavorite;
        menuItem.isActive = newMenuItem.isActive;

        const now = new Date().toISOString();
        menuItem.createdDate = now;
        menuItem.updatedDate = now;
        menuItem.createdById = userId;
        menuItem.updatedById = userId;

        // Publish domain event
        menuItem.addDomainEvent(new MenuItemCreatedEvent(menuItem));

        return Ok(menuItem);
    }

    // Factory method for reconstituting from database
    public static reconstitute(data: IMenuItem): Result<MenuItemEntity, Error> {
        const menuItem = new MenuItemEntity();
        Object.assign(menuItem, data);
        return Ok(menuItem);
    }

    public update(menuItem: IMenuItem, userId: string): void {
        this.updatedDate = new Date().toISOString();
        this.updatedById = userId;
        this.addDomainEvent(new MenuItemUpdatedEvent(this, menuItem));
    }
}
