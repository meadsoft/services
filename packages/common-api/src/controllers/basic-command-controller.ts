import { Body, Delete, Param, Post, Put, Type, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { ZodObject } from 'zod';
import { validateUuid, InvalidIDException, Entity } from '@meadsoft/common';
import type { ICommandRepository } from '@meadsoft/common-infrastructure';

export function createCommandController<
    TModel extends Entity,
    TNewModel extends object,
>(model: Type<TModel>, newModelSchema: ZodObject) {
    class CommandController {
        constructor(
            public repository: ICommandRepository<TModel>,
            public newToPersistent: (item: TNewModel) => TModel,
            public updater: (existing: TModel) => TModel,
        ) {}

        @Post()
        @UsePipes(new ZodValidationPipe(newModelSchema))
        @ApiCreatedResponse({ type: model })
        async create(@Body() newItem: TNewModel): Promise<TModel> {
            const item: TModel = this.newToPersistent(newItem);
            return await this.repository.create(item);
        }

        @Put(':id')
        @UsePipes(new ZodValidationPipe(newModelSchema))
        @ApiOkResponse({ type: model })
        async update(
            @Param('id') id: string,
            @Body() updates: TModel,
        ): Promise<TModel | undefined> {
            this.updater(updates);
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
