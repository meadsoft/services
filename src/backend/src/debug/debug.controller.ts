import { Controller, Get } from '@nestjs/common';

@Controller('debug')
export class DebugController {
    @Get('hello-world')
    getHello(): string {
        return 'Hello World!';
    }
}
