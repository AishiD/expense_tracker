import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import authRoutes from "./routes/auth.route.js";
import expenseRoutes from "./routes/expense.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.APP_BASE_URL,
    credentials: true,
  }),
);

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
