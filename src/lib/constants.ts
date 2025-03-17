export const SEQUELIZE_HOST = process.env.MYSQL_HOST ?? 'localhost';
export const SEQUELIZE_PORT = process.env.MYSQL_PORT
  ? Number(process.env.MYSQL_PORT)
  : 3306;
export const SEQUELIZE_USERNAME = process.env.MYSQL_USERNAME ?? 'root';
export const SEQUELIZE_PASSWORD = process.env.MYSQL_PASSWORD ?? '';
export const SEQUELIZE_DATABASE = process.env.MYSQL_DATABASE ?? 'byahe_db';

export const JWT_SECRET = process.env.JWT_SECRET ?? 'secretKey';

export const ROW_LIMIT = 10;
