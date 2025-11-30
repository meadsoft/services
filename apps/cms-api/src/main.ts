import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { HttpConfig } from './http.config';
import { AppModule } from './app.module';

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

    app.use(cookieParser());

    const httpConfig = app.get(HttpConfig);
    await app.listen(httpConfig.port || DEFAULT_PORT);
}
bootstrap();
