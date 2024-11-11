import 'dotenv/config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  applicationName: 'stay_organize_core',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false, // FIXME: need to turn this off before production
  migrationsRun: false,
  logging: false, // FIXME: Opern
  namingStrategy: new SnakeNamingStrategy(),
  uuidExtension: 'pgcrypto',
  extra: {
    max: 55,
  },
});

export default DataSource;
