import { Get, Param, Type } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { validateUuid, InvalidIDException, Entity } from '@meadsoft/common';
import type { IQueryRepository } from '@meadsoft/common-infrastructure';

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
