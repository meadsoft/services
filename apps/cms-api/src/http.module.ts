import { Module } from '@nestjs/common';
import { HttpConfigProvider } from './http.config';

@Module({
    providers: [HttpConfigProvider],
})
export class HttpModule {}
