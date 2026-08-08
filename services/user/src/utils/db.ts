import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      dbName: "blog",
      tls: true // Enable TLS/SSL connection tls means that the connection to the database will be encrypted using Transport Layer Security (TLS) protocol. 
                ///This is important for security, especially when connecting to a remote database over the internet.
    });

    console.log("Connected to database successfully");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
};

export default connectDb;
