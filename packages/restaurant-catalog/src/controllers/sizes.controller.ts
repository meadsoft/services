import { Controller } from '@nestjs/common';
import {
    NewSize,
    NewSizeSchema,
    Size,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-api';
import { SizesRepository } from '../infrastructure/repositories/sizes.repo';
import { ApiTags } from '@nestjs/swagger';

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
    constructor(repository: SizesRepository) {
        super(repository);
    }
}
