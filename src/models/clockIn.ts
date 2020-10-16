import mongoose, { Schema, Document } from 'mongoose';

export interface Clockin extends Document {
  day: string;
  registers: [string];
}

const ClockInSchema: Schema = new Schema({
  day: { type: String, required: true },
  registers: { type: [String], required: true },
});

const ClockIn = mongoose.model<Clockin>('ClockIn', ClockInSchema);
export default ClockIn;
