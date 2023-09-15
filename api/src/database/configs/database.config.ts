import { join } from 'path';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : process.env.ENV;

dotenv.config({ path: `./.env.${env}` });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  synchronize: false,
  entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
  migrations: [
    join(__dirname, '..', '..', '**', 'database/migrations/*.{ts,js}')
  ]
};

export const dataSource = new DataSource(dataSourceOptions);
