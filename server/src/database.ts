import 'reflect-metadata';
import { createConnection, getConnectionOptions, Connection, ConnectionOptions } from 'typeorm';

export default async function connectDatabase(): Promise<Connection> {
  const connectionOptions: ConnectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
    logging: process.env.NODE_ENV !== 'production', // Turn this to `false` to turn off TypeORM SQL logger
    synchronize: true,
  } as ConnectionOptions);

  try {
    const connection = await createConnection(connectionOptions);

    return connection;
  } catch (error) {
    console.log('❌', error);
    process.exit();
  }
}
