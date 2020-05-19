import { init, MongoClient } from 'https://deno.land/x/mongo@v0.6.0/mod.ts';

await init();

class Database {
  public client: MongoClient;

  constructor(
    public host: string,
    public name: string,
    public password: string,
    public port: string,
    public username: string,
  ) {
    this.client = {} as MongoClient;
    this.host = host;
    this.name = name;
    this.password = password;
    this.port = port;
    this.username = username;
  }

  connect() {
    const client = new MongoClient();
    client.connectWithUri(
      `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.name}`,
    );
    this.client = client;
  }
};

const client = new Database(
  Deno.env.get('DB_HOST') || '',
  Deno.env.get('DB_NAME') || '',
  Deno.env.get('DB_PASSWORD') || '',
  Deno.env.get('DB_PORT') || '',
  Deno.env.get('DB_USERNAME') || '',
);
client.connect();

export default client;
