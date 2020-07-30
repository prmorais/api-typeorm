import dotenv from 'dotenv';
import app from './app';
import 'reflect-metadata';
import './database';

dotenv.config();

let port: any = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('🏃 Running Server', port);
});
