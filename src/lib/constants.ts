export const SEQUELIZE_HOST = process.env.SQL_HOST ?? 'localhost';
export const SEQUELIZE_PORT = process.env.SQL_PORT
  ? Number(process.env.SQL_PORT)
  : 3306;
export const SEQUELIZE_USERNAME = process.env.SQL_USERNAME ?? 'root';
export const SEQUELIZE_PASSWORD = process.env.SQL_PASSWORD ?? '';
export const SEQUELIZE_DATABASE = process.env.SQL_DATABASE ?? 'byahe_db';

export const JWT_SECRET = process.env.JWT_SECRET ?? 'secretKey';

export const ROW_LIMIT = 10;
