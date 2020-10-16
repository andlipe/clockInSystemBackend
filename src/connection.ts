import mongoose from 'mongoose';

const mongooseConnect = () => {
  mongoose
    .connect(
      'mongodb+srv://user:senha@host/clockIn?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
    )
    .then(() => {
      return console.log('conectou');
    })
    .catch(error => {
      console.log('deu erro', error);
      return process.exit(1);
    });
};

export default mongooseConnect;
