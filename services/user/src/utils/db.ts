import mongoose from 'mongoose';

const connectDb=async()=>{
    try
{    mongoose.connect(process.env.MONGO_URL as string,{dbName:"blog"})
    console.log("Connected to database successfully");
}
catch(err){
    console.log("Error connecting to database",err);
}

};

export default connectDb