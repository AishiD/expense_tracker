import mooongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mooongoose.connect(process.env.MONGO_URI, {
      dbName: "expense_tracker",
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
