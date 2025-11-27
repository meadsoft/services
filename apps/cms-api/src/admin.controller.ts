import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@haru-cafe/auth/guards/auth.guard';
import { RolesGuard } from '@haru-cafe/auth/guards/roles.guard';

@Controller('admin')
@UseGuards(AuthGuard(), new RolesGuard('admin'))
export class AdminController {
    @Get()
    getAdminData() {
        return { secret: 'Only admins can see this' };
    }
}
