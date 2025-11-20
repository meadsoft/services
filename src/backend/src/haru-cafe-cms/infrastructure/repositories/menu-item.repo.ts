import { Injectable } from '@nestjs/common';
import { PostgresService } from '../drizzle/postgres.service';

@Injectable()
export class MenuItemRepository {
    constructor(private readonly postgresService: PostgresService) {}
}
