import "dotenv/config";
import express from "express";
import rootRoute from "./routes/root.route";
import userRoute from "./routes/user.route";
import { connectDb } from "./config/prisma";
import { prismaErrorHandler } from "./middleware/error.middleware";

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", rootRoute);
app.use("/api/v1/user", userRoute);

app.use(prismaErrorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
  } catch (error) {
    console.log("Error starting express app", error);
    process.exit(1);
  }
};

await startServer();
