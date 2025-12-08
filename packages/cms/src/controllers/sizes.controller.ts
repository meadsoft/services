import { Controller } from '@nestjs/common';
import {
    NewSize,
    NewSizeSchema,
    Size,
    SizeSchema,
} from '@haru-cafe/cms-contracts';
import {
    createCommandController,
    createQueryController,
} from '@haru-cafe/common-api';
import { SizesRepository } from '../infrastructure/repositories/sizes.repo';
import { ApiTags } from '@nestjs/swagger';

const sizesQueryController = createQueryController<Size>(
    new Size(),
    SizeSchema,
);

const sizesCommandController = createCommandController<Size, NewSize>(
    new Size(),
    SizeSchema,
    new NewSize(),
    NewSizeSchema,
);

@ApiTags('Sizes')
@Controller('sizes')
export class SizesQueryController extends sizesQueryController<Size> {
    constructor(repository: SizesRepository) {
        super(repository);
    }
}

@ApiTags('Sizes')
@Controller('sizes')
export class SizesCommandController extends sizesCommandController<
    Size,
    NewSize
> {
    constructor(repository: SizesRepository) {
        super(repository);
    }
}
