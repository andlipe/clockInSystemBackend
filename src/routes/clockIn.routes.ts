import { Router } from 'express';
import ClockInController from '../controller/clockInController';

const clockInRouter = Router();
const clock = new ClockInController();

clockInRouter.get('/', async (request, response) => {
  const listClockIns = await clock.listAllClockIns();
  return response.json(listClockIns);
});

clockInRouter.get('/:_id', async (request, response) => {
  const { _id } = request.params;
  const listClockIns = await clock.listOneClockIn(_id);
  return response.json(listClockIns);
});


clockInRouter.post('/', async (request, response) => {
  try {
    const dataAtual = await clock.clockIn();
    return response.status(201).json(dataAtual);
  } catch (error) {
    return response.status(400).json(error);
  }
});

clockInRouter.put('/:_id', async (request, response) => {
  const { _id } = request.params;

  const registerClockIn = await clock.clockInOnThatTime(_id);
  return response.json(registerClockIn);
});

clockInRouter.patch('/:_id', async (request, response) => {
  try {
    const { _id } = request.params;
    const { time } = request.body;
    console.log(time);
    const removeRegister = await clock.deleteRegister(_id, time);
    if (removeRegister === null) {
      throw new Error('teste');
    }
    return response.json(removeRegister);
  } catch (error) {
    return response.status(500).json(error);
  }
});
export default clockInRouter;
