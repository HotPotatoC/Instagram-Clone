import { Connection } from 'typeorm';

import './redis';
import express from './config/express';
import connectDatabase from './database';

connectDatabase().then((connection: Connection) => {
  if (connection && connection.isConnected) {
    console.log('✅ Connected to database');
  }

  const port = process.env.PORT;

  express.listen(port, () => {
    console.log(`⚡ Server started -> http://localhost:${port}`);
  });
});
