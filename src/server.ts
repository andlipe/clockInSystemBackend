import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';
require('dotenv').config();
import mongooseConnect from './connection';

const app = express();
app.use(cors());
app.use(json());
app.use(routes);
mongooseConnect();
app.listen(3031);
