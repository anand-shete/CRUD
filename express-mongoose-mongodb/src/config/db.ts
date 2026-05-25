import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    await connect(process.env.MONGO_URI!, {
      maxPoolSize: 10,
    });
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error("MongoDB connection err", error);
    process.exit(1);
  }
};
