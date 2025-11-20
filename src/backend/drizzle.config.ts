import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: 'src/haru-cafe-cms/infrastructure/drizzle/migrations',
    schema: 'src/haru-cafe-cms/infrastructure/drizzle/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
