import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items/menu-items.repo';
import { MenuItem } from '../contracts/menu-items.model';

@Controller('menu-items')
export class MenuItemsController {
    constructor(private readonly repository: MenuItemRepository) {}

    @Get(':id')
    async findById(@Param('id') id: string): Promise<MenuItem | undefined> {
        return await this.repository.findById(id);
    }

    @Get()
    async findAll(): Promise<MenuItem[]> {
        return await this.repository.findAll();
    }

    @Post()
    async create(
        @Body('item') item: Omit<MenuItem, 'id'>,
        userId: string,
    ): Promise<MenuItem> {
        return await this.repository.create(item, userId);
    }

    @Post(':id')
    async update(
        @Param('id') id: string,
        @Body('updates') updates: Partial<MenuItem>,
        userId: string,
    ): Promise<MenuItem | undefined> {
        return await this.repository.update(id, updates, userId);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }
}
