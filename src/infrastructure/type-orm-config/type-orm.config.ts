import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';

const env = dotenv.parse(fs.readFileSync('.env'));
export const typeOrmConfigOptions: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  database: env.DATABASE_NAME,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  host: env.DATABASE_HOST,
  port: +env.DATABASE_PORT,
  entities: ['dist/domain/entities/*.js'],
  migrations: ['dist/infrastructure/migrations/*.js'],
  migrationsRun: true,
};

export default new DataSource(typeOrmConfigOptions);
