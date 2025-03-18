import * as dotenv from 'dotenv';

dotenv.config();

export const SEQUELIZE_HOST = process.env.SQL_HOST ?? 'localhost';
export const SEQUELIZE_PORT = process.env.SQL_PORT
  ? Number(process.env.SQL_PORT)
  : 5432;
export const SEQUELIZE_USERNAME = process.env.SQL_USERNAME ?? 'root';
export const SEQUELIZE_PASSWORD = process.env.SQL_PASSWORD ?? '';
export const SEQUELIZE_DATABASE = process.env.SQL_DATABASE ?? 'byahe_db';

export const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
export const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY ?? '';
export const SUPABASE_BUCKET = 'uploads';

export const JWT_SECRET = process.env.JWT_SECRET ?? 'secretKey';

export const ROW_LIMIT = 10;
