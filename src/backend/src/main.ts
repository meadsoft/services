import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpConfig } from './api/http-config.schema';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug'],
    });
    const httpConfig = app.get(HttpConfig);
    await app.listen(httpConfig.port);
}
bootstrap();
