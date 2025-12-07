import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { FirebaseModule } from '@haru-cafe/google';
import { AuthController } from './auth.controller';
import { AuthConfigProvider } from './auth.config';

@Module({
    imports: [
        PassportModule,
        FirebaseModule,
        JwtModule.register({
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthConfigProvider],
})
export class AuthModule {}
