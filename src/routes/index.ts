import { Router } from 'express';
import clockInRouter from './clockIn.routes';

const routes = Router();
routes.use('/clockIn', clockInRouter);

export default routes;
