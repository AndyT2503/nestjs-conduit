export interface EnvironmentConfiguration {
  database: DatabaseConfiguration;
  listeningPort: number;
  jwtSecret: string;
}

interface DatabaseConfiguration {
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
}
