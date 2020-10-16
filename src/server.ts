import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';
import mongooseConnect from './connection';

const app = express();
app.use(cors());
app.use(json());
app.use(routes);
mongooseConnect();
app.listen(3031);
