import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
} from '@nestjs/common';
import { MenuItemRepository } from '../infrastructure/repositories/menu-items.repo';
import {
    MenuItem,
    NewMenuItem,
    NewMenuItemSchema,
} from '@haru-cafe/cms-contracts';
import { validateUuid } from '@haru-cafe/common';
import { InvalidIDException } from '@haru-cafe/common-api';
import { ZodValidationPipe } from 'nestjs-zod';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Menu Items')
@Controller('menu-items')
export class MenuItemsController {
    constructor(private readonly repository: MenuItemRepository) {}

    @Get(':id')
    @ApiOkResponse({ type: MenuItem })
    async findById(@Param('id') id: string): Promise<MenuItem | null> {
        if (validateUuid(id) === false) {
            throw new InvalidIDException();
        }
        const result = await this.repository.findById(id);
        return result;
    }

    @Get()
    @ApiOkResponse({ type: MenuItem, isArray: true })
    async findAll(): Promise<MenuItem[]> {
        return await this.repository.findAll();
    }

    @Post()
    @UsePipes(new ZodValidationPipe(NewMenuItemSchema))
    @ApiCreatedResponse({ type: MenuItem })
    async create(@Body() item: NewMenuItem, userId: string): Promise<MenuItem> {
        return await this.repository.create(item, userId);
    }

    @Put(':id')
    @UsePipes(new ZodValidationPipe(NewMenuItemSchema))
    @ApiOkResponse({ type: MenuItem })
    async update(
        @Param('id') id: string,
        @Body() updates: NewMenuItem,
        userId: string,
    ): Promise<MenuItem | undefined> {
        return await this.repository.update(id, updates, userId);
    }

    @Delete(':id')
    @ApiOkResponse({ type: Boolean })
    async delete(@Param('id') id: string): Promise<boolean> {
        if (validateUuid(id) === false) {
            throw new InvalidIDException();
        }
        return await this.repository.delete(id);
    }
}
