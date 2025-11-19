import { RolesGuard } from '@meadsoft/auth/roles.guard';
import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), new RolesGuard('admin'))
export class AdminController {
    @Get()
    getAdminData() {
        return { secret: 'Only admins can see this' };
    }
}
