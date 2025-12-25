import { Body, Delete, Param, Post, Put, Type, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { ZodObject } from 'zod';
import {
    validateUuid,
    InvalidIDException,
    Entity,
    ICrudService,
    SYSTEM_UUID,
} from '@meadsoft/common';

export function createCommandController<TNewModel, TModel extends Entity>(
    model: Type<TModel>,
    modelSchema: ZodObject,
) {
    class CommandController {
        constructor(public service: ICrudService<TNewModel, TModel>) {}

        @Post()
        @UsePipes(new ZodValidationPipe(modelSchema))
        @ApiCreatedResponse({ type: model })
        async create(@Body() item: TNewModel): Promise<TModel> {
            return await this.service.createOne(SYSTEM_UUID, item);
        }

        @Put(':id')
        @UsePipes(new ZodValidationPipe(modelSchema))
        @ApiOkResponse({ type: model })
        async update(
            @Param('id') id: string,
            @Body() updates: TNewModel,
        ): Promise<TModel | undefined> {
            return await this.service.updateOne(SYSTEM_UUID, id, updates);
        }

        @Delete(':id')
        @ApiOkResponse({ type: Boolean })
        async delete(@Param('id') id: string): Promise<boolean> {
            if (validateUuid(id) === false) {
                throw new InvalidIDException();
            }
            return await this.service.deleteOne(SYSTEM_UUID, id);
        }
    }

    return CommandController;
}
