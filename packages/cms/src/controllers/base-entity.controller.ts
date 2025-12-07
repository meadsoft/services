import { Body, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { ZodObject } from 'zod';
import {
    validateUuid,
    InvalidIDException,
    BaseCmsModel,
} from '@haru-cafe/common';
import type { IRepository } from '@haru-cafe/common-infrastructure';

export function createBaseEntityController<
    TModel extends BaseCmsModel,
    TNewModel extends object,
>(
    model: TModel,
    _modelSchema: ZodObject,
    _newModel: TNewModel,
    newModelSchema: ZodObject,
) {
    class BaseModelController<
        TModel extends BaseCmsModel,
        TNewModel extends object,
    > {
        constructor(public repository: IRepository<TNewModel, TModel>) {}

        @Get(':id')
        @ApiOkResponse({ type: typeof model })
        async findById(@Param('id') id: string): Promise<TModel | null> {
            if (validateUuid(id) === false) {
                throw new InvalidIDException();
            }
            const result = await this.repository.findById(id);
            return result;
        }

        @Get()
        @ApiOkResponse({ type: typeof model, isArray: true })
        async findAll(): Promise<TModel[]> {
            return await this.repository.findAll();
        }

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

    return BaseModelController;
}
