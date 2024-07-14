import { config } from "dotenv";
import  express  from "express";
import morgan from 'morgan';
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
config();

const app = express();

// !Middleware 
// List of allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://ai-chat-bot-frontend-sigma.vercel.app'];

// CORS options delegate function
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials: true }; // Enable CORS for this request
  } else {
    corsOptions = { origin: false }; // Disable CORS for this request
  }
  callback(null, corsOptions); // Callback expects two parameters: error and options
};

// Use the CORS middleware with the options delegate
app.use(cors(corsOptionsDelegate));


// app.use(cors(
//     {
//         origin: 'http://localhost:5173',
//         credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//       }
// ))

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// ! remove it in production
app.use(morgan("dev"));

app.use("/",appRouter)
export default app;