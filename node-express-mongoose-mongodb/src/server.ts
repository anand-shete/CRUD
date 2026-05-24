import "dotenv/config";
import express from "express";
import { connectDb } from "./config/db.js";
import baseRoutes from "./routes/base.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());

const startServer = async () => {
  try {
    await connectDb();

    app.use("/api/v1", baseRoutes);
    app.use("/api/v1/user", userRoutes);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
