export interface EnvironmentConfiguration {
  database: DatabaseConfiguration;
  listeningPort: number;
}

interface DatabaseConfiguration {
  name: string;
  username: string;
  password: string;
  host: string;
  port: number;
}
