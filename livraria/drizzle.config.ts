import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './src/db/database/database.constants';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schemas/index.ts',
  dialect: 'mssql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
