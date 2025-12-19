import { Module } from '@nestjs/common';
import { InfrastructureProvider } from './infrastructure.config';

@Module({
    providers: [InfrastructureProvider],
    exports: [InfrastructureProvider],
})
export class InfrastructureModule {}
