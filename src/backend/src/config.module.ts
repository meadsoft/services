import { Module } from '@nestjs/common';
import { HTTP_CONFIG, provideHttpConfig } from './api/http-config.provider';
import { ENV_CONFIG, provideEnvConfig } from './common/env-config.provider';

@Module({
    providers: [provideEnvConfig, provideHttpConfig],
    exports: [ENV_CONFIG, HTTP_CONFIG],
})
export class ConfigModule {}
