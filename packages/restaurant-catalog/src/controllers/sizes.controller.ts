import { Controller } from '@nestjs/common';
import {
    NewSize,
    Size,
    SizeSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-http';
import { SizesRepository } from '../infrastructure/repositories/sizes.repo';
import { ApiTags } from '@nestjs/swagger';

const sizesQueryController = createQueryController<Size>(Size);

const sizesCommandController = createCommandController<NewSize, Size>(
    Size,
    SizeSchema,
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
