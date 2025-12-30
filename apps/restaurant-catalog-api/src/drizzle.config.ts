import { defineConfig } from 'drizzle-kit';

const DATABASE_URL = process.env.DATABASE_URL;

if (DATABASE_URL === undefined) {
    throw new Error('DATABASE_URL is not defined in environment variables');
} else {
    console.log('DATABASE_URL is defined');
}

export default defineConfig({
    out: 'src/migrations',
    schema: 'node_modules/@meadsoft/restaurant-catalog/src/database/tables',
    dialect: 'postgresql',
    dbCredentials: {
        url: DATABASE_URL,
    },
});
