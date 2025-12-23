import { Controller } from '@nestjs/common';
import {
    INewSize,
    ISize,
    NewSize,
    NewSizeSchema,
    Size,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-http';
import { SizesRepository } from '../infrastructure/repositories/sizes.repo';
import { ApiTags } from '@nestjs/swagger';
import { EntityService, SYSTEM_UUID } from '@meadsoft/common';

const sizesQueryController = createQueryController<Size>(Size);

const sizesCommandController = createCommandController<Size, NewSize>(
    Size,
    NewSizeSchema,
);

@ApiTags('Sizes')
@Controller('sizes')
export class SizesQueryController extends sizesQueryController {
    constructor(repository: SizesRepository) {
        super(repository);
    }
}

@ApiTags('Sizes')
@Controller('sizes')
export class SizesCommandController extends sizesCommandController {
    constructor(repository: SizesRepository, entityService: EntityService) {
        const newToPersistent = (newItem: INewSize): ISize => {
            return entityService.create<INewSize>(SYSTEM_UUID, newItem);
        };
        const updater = (item: ISize): ISize => {
            return entityService.update<ISize>(SYSTEM_UUID, item);
        };
        super(repository, newToPersistent, updater);
    }
}
