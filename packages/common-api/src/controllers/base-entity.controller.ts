import { Body, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { ZodObject } from 'zod';
import { validateUuid, InvalidIDException, Entity } from '@meadsoft/common';
import type {
    ICommandRepository,
    IQueryRepository,
} from '@meadsoft/common-infrastructure';

export function createQueryController<TModel extends Entity>(
    model: TModel,
    _modelSchema: ZodObject,
) {
    class QueryController<TModel extends Entity> {
        constructor(public repository: IQueryRepository<TModel>) {}

        @Get(':id')
        @ApiOkResponse({ type: typeof model })
        async findById(@Param('id') id: string): Promise<TModel | null> {
            if (validateUuid(id) === false) {
                throw new InvalidIDException();
            }
            return this.repository.findById(id);
        }

        @Get()
        @ApiOkResponse({ type: typeof model, isArray: true })
        async findAll(): Promise<TModel[]> {
            return await this.repository.findAll();
        }
    }

    return QueryController;
}

export function createCommandController<
    TModel extends Entity,
    TNewModel extends object,
>(
    model: TModel,
    _modelSchema: ZodObject,
    _newModel: TNewModel,
    newModelSchema: ZodObject,
) {
    class CommandController<TModel extends Entity, TNewModel extends object> {
        constructor(public repository: ICommandRepository<TNewModel, TModel>) {}

        @Post()
        @UsePipes(new ZodValidationPipe(newModelSchema))
        @ApiCreatedResponse({ type: typeof model })
        async create(@Body() item: TNewModel, userId: string): Promise<TModel> {
            return await this.repository.create(item, userId);
        }

        @Put(':id')
        @UsePipes(new ZodValidationPipe(newModelSchema))
        @ApiOkResponse({ type: typeof model })
        async update(
            @Param('id') id: string,
            @Body() updates: TNewModel,
            userId: string,
        ): Promise<TModel | undefined> {
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

    return CommandController;
}
