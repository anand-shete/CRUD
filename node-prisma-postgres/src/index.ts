import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); // parse form data (x-www-form-urlencoded)
app.use(express.json()); // parse incoming raw json payloads
app.use(cookieParser());

app.get("/", async (req, res) => {
  return res.status(200).json({ message: "CRUD app Healthcheck passed 🚀" });
});

app.use("/auth", authRoutes);
app.use("/user", authMiddleware, userRoutes);

app.listen(PORT, () => console.log(`App running on port:${PORT}`));
