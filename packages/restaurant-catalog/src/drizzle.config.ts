import { defineConfig } from 'drizzle-kit';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
} else {
    console.log();
}

export default defineConfig({
    out: 'src/infrastructure/migrations',
    schema: 'src/infrastructure/tables',
    dialect: 'postgresql',
    dbCredentials: {
        url: DATABASE_URL,
    },
});
