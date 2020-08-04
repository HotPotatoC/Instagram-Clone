import 'reflect-metadata';
import { createConnection, getConnectionOptions, Connection, ConnectionOptions } from 'typeorm';

export default async function connectDatabase(): Promise<Connection> {
  const connectionOptions: ConnectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
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
