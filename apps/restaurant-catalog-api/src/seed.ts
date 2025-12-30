import { NestFactory } from '@nestjs/core';
import { MenuItemCommandService } from '@meadsoft/restaurant-catalog';
import { RestaurantCatalogModule } from '@meadsoft/restaurant-catalog';
import {
    INewMenuItem,
    NewMenuItemSchema,
} from '@meadsoft/restaurant-catalog-contracts';
import * as fs from 'fs';
import * as path from 'path';
import { Environment, SYSTEM_UUID } from '@meadsoft/common';
import { ZodSafeParseResult } from 'zod';

if (process.env.APP_ENV !== Environment.LOCAL) {
    throw new Error('Seeding is only allowed in local environments');
}

// inputs
const module = RestaurantCatalogModule;
const commandServiceClass = MenuItemCommandService;
const schema = NewMenuItemSchema;
const jsonPath = path.join(__dirname, 'seeds', 'haru-cafe-menu-items.json');
//

async function bootstrap() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const rawItems: object[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const parseResults: ZodSafeParseResult<INewMenuItem>[] = rawItems.map(
        (item: unknown) => schema.safeParse(item),
    );
    const hasFailedParse = parseResults.some((result) => !result.success);
    if (hasFailedParse) {
        const errors = parseResults
            .filter((result) => !result.success)
            .map((result) => result.error.issues);
        console.error('Failed to parse some items');
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        console.error(JSON.stringify(errors, null, 2));
        throw new Error('Failed to parse some items');
    }
    const newItems = parseResults
        .filter((result) => result.success)
        .map((result) => result.data);
    console.log(`Seeding ${parseResults.length.toString()} items...`);
    const app = await NestFactory.createApplicationContext(module);
    const commandService = app.get(commandServiceClass);
    const result = await commandService.createMany(SYSTEM_UUID, ...newItems);

    if (result.ok) {
        console.log(`✓ Created: ${parseResults.length.toString()} items`);
    } else {
        console.error(
            `✗ Failed to create ${parseResults.length.toString()} items:`,
            result.val.message,
        );
    }
    await app.close();
}

bootstrap().catch((error: unknown) => {
    console.error('✗ Seeding failed:', error);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    process.exit(1);
});
