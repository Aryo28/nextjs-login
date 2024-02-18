import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_HOST!);
    const conn = mongoose.connection;

    conn.on('connected', () => { // lister to ensure connection
        console.log('Connected to Mongoose!');
    });

    conn.on('error', (err) =>{
        console.log('Failed to connect to Mongoose: ', err);
        process.exit(1);

    })

  } catch (err) {
    console.log("Failed to connect to MongoDB");
    console.log(err);
  }
};
