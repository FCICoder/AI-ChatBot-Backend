import { config } from "dotenv";
import express from "express";
import morgan from 'morgan';
import appRouter from "./routes/index.js";
config();
const app = express();
// !Middleware 
app.use(express.json());
// ! remove it in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map