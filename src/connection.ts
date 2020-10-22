import mongoose from 'mongoose';

const mongooseConnect = () => {

  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
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
