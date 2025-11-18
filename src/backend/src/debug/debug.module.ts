import { Module } from '@nestjs/common';
import { DebugController } from './debug.controller';

@Module({
    imports: [],
    controllers: [DebugController],
    providers: [],
})
export class DebugModule {}
