import { getTime, getHours, getMinutes, format } from 'date-fns';
import ClockIn from '../models/clockIn';

class ClockInController {
  private getDate() {
    const date = new Date();
    return date;
  }

  public async clockIn(): Promise<any> {
    const date = new Date();
    const actualDate = format(date, 'd/MM/yyyy');
    const checkIfIsOtherDate = await ClockIn.findOne(
      { day: `${actualDate}` },
      'day',
    );
    if (checkIfIsOtherDate !== null) {
      const err = new Error(
        'Já foi criado registro para o dia de hoje, use o Patch',
      );
      throw err;
    }
    const timeInMiliSeconds = getTime(date.getTime());
    const actualTime = `${getHours(timeInMiliSeconds)}:${getMinutes(
      timeInMiliSeconds,
    )}`;
    const createClockIn = new ClockIn({
      day: actualDate,
      registers: actualTime,
    });

    const criou = ClockIn.create(createClockIn);
    return criou;
  }

  public async listAllClockIns(): Promise<any> {
    const clockIns = await ClockIn.find();
    return clockIns;
  }

  public async listOneClockIn(id: string): Promise<any> {
    const clockIns = await ClockIn.findById({ _id : id });
    return clockIns;
  }

  public async clockInOnThatTime(id: string): Promise<any> {
    const date = new Date();
    const timeInMiliSeconds = getTime(date.getTime());
    const actualTime = `${getHours(timeInMiliSeconds)}:${getMinutes(
      timeInMiliSeconds,
    )}`;
    await ClockIn.findByIdAndUpdate(
      { _id: id },
      { $push: { registers: actualTime } },
    );
    const searchClockIn = await ClockIn.findById({
      _id: id
    });
    console.log(searchClockIn)
    return searchClockIn;
  }

public async modifyOneRegister(
    id: string,
    newTime: string,
  ): Promise<any> {

    console.log(id);

    await ClockIn.findOneAndUpdate(
      { _id: id },{$set: {registers: newTime}}
    );

    const searchClockIn = await ClockIn.findById({
      _id: id
    });
    return searchClockIn
  }

  public async deleteRegister(id: string, time: [string]) {
    const deleteRegister = await ClockIn.findByIdAndUpdate(
      { _id: id },
      { $pull: { registers: time } });
    const searchClockIn = await ClockIn.findById({
        _id: id
      });
    return searchClockIn;
  }
}

export default ClockInController;
