import { init, MongoClient } from 'https://deno.land/x/mongo@v0.6.0/mod.ts';

import { DATABASE as DB } from '../config/index.ts';

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

  get database() {
    return this.client.database(this.name);
  }
};

const client = new Database(
  DB.host || '',
  DB.name || '',
  DB.password || '',
  `${DB.port}` || '27017',
  DB.username || '',
);
client.connect();
const { database } = client;

export default database;
