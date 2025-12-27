import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      dbName: "blog",
      tls: true
    });

    console.log("Connected to database successfully");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
};

export default connectDb;
