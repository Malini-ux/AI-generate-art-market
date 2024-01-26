import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('mongo connection successful'))
    .catch((err) => {
      console.error('unable to connect with mongo');
      console.error(err);
    });
};

export default connectDB;
