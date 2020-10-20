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
  const listOneClockin = await clock.listOneClockIn(_id);
  return response.json(listOneClockin);
});


clockInRouter.post('/', async (request, response) => {
  try {
    const actualDate = await clock.clockIn();
    return response.status(201).json(actualDate);
  } catch (error) {
    return response.status(400).json(error);
  }
});

clockInRouter.put('/:_id', async (request, response) => {
  const { _id } = request.params;

  const createRegisterOnDate = await clock.clockInOnThatTime(_id);
  return response.json(createRegisterOnDate);
});

clockInRouter.patch('/:_id', async (request, response) => {
  try {
    const { _id } = request.params;
    const { newTime } = request.body;
    console.log(request.body);
    if(newTime){
      console.log('teste')
      const attRegister = await clock.modifyOneRegister(_id, newTime);

      return response.json(attRegister);
    }

    const { time } = request.body;
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
