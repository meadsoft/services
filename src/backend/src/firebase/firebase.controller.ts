import * as firebaseAdmin from 'firebase-admin';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@meadsoft/firebase/decorators/user.decorator';
import { FirebaseAuthGuard } from './auth.guard';

@Controller(['auth', 'firebase'])
export class FirebaseAuthController {
    @Get('user')
    @UseGuards(FirebaseAuthGuard)
    getUser(@CurrentUser() user: firebaseAdmin.auth.DecodedIdToken) {
        return {
            message: 'This is a protected resource',
            userId: user.uid,
            email: user.email,
        };
    }
}
