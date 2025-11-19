import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpConfig } from './api/http.config';
import cookieParser from 'cookie-parser';

const DEFAULT_PORT = 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug'],
    });

    app.enableCors({
        origin: 'http://localhost:4200',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Enable cookie parsing
    app.use(cookieParser());

    const httpConfig = app.get(HttpConfig);
    await app.listen(httpConfig.port || DEFAULT_PORT);
}
bootstrap();
