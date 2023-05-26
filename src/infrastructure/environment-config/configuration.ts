import { EnvironmentConfiguration } from './config.model';

export const environmentConfiguration = (): EnvironmentConfiguration => ({
  database: {
    name: process.env.DATABASE_NAME!,
    username: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    host: process.env.DATABASE_HOST!,
    port: +process.env.DATABASE_PORT!,
  },
  listeningPort: +process.env.LISTENING_PORT!,
  jwtSecret: process.env.JWT_SECRET!,
});
