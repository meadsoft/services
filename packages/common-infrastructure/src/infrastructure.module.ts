import { Module } from '@nestjs/common';
import { BaseModelService } from './base-model.service';
import { InfrastructureProvider } from './infrastructure.config';

@Module({
    providers: [BaseModelService, InfrastructureProvider],
    exports: [BaseModelService, InfrastructureProvider],
})
export class InfrastructureModule {}
