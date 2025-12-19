import {
    Body,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Type,
    UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { ZodObject } from 'zod';
import { validateUuid, InvalidIDException, Entity } from '@meadsoft/common';
import type {
    ICommandRepository,
    IQueryRepository,
} from '@meadsoft/common-infrastructure';

export function createQueryController<TModel extends Entity>(
    model: Type<TModel>,
) {
    class QueryController {
        constructor(public readonly repository: IQueryRepository<TModel>) {}

        @Get(':id')
        @ApiOkResponse({ type: model })
        async findById(@Param('id') id: string): Promise<TModel | null> {
            if (validateUuid(id) === false) {
                throw new InvalidIDException();
            }
            const item = await this.repository.findById(id);
            if (item === null) {
                return null;
            }
            return item;
        }

        @Get()
        @ApiOkResponse({ type: model, isArray: true })
        async findAll(): Promise<TModel[]> {
            return await this.repository.findAll();
        }
    }

    return QueryController;
}

export function createCommandController<
    TModel extends Entity,
    TNewModel extends object,
>(model: Type<TModel>, newModelSchema: ZodObject) {
    class CommandController {
        constructor(
            public repository: ICommandRepository<TModel>,
            public newToPersistent: (item: TNewModel, userId: string) => TModel,
            public updater: (existing: TModel, userId: string) => TModel,
        ) {}

        @Post()
        @UsePipes(new ZodValidationPipe(newModelSchema))
        @ApiCreatedResponse({ type: model })
        async create(
            @Body() newItem: TNewModel,
            userId: string,
        ): Promise<TModel> {
            const item: TModel = this.newToPersistent(newItem, userId);
            return await this.repository.create(item);
        }

        @Put(':id')
        @UsePipes(new ZodValidationPipe(newModelSchema))
        @ApiOkResponse({ type: model })
        async update(
            @Param('id') id: string,
            @Body() updates: TModel,
            userId: string,
        ): Promise<TModel | undefined> {
            this.updater(updates, userId);
            return await this.repository.update(id, updates);
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

    return CommandController;
}
