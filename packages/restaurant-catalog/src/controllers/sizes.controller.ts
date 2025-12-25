import { Controller } from '@nestjs/common';
import {
    NewSize,
    NewSizeSchema,
    Size,
    SizeSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import {
    createCommandController,
    createQueryController,
} from '@meadsoft/common-http';
import { ApiTags } from '@nestjs/swagger';
import {
    SizeCommandService,
    SizeQueryService,
} from '../services/sizes.service';

const sizesQueryController = createQueryController<Size>(Size);

const sizesCommandController = createCommandController<NewSize, Size>(
    Size,
    NewSizeSchema,
    SizeSchema,
);

@ApiTags('Sizes')
@Controller('sizes')
export class SizesQueryController extends sizesQueryController {
    constructor(service: SizeQueryService) {
        super(service);
    }
}

@ApiTags('Sizes')
@Controller('sizes')
export class SizesCommandController extends sizesCommandController {
    constructor(service: SizeCommandService) {
        super(service);
    }
}
