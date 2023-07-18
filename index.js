import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./router/apiRouter.js";
dotenv.config();
const PORT = 5000;

const app = express();
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_LINK, process.env.ADMIN_LINK, 'https://a80f-194-226-199-9.ngrok-free.app'],
    optionsSuccessStatus: 200,
  })
);
// Define routes
app.use("/api", apiRouter);

// Start the server
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
/*

const Router = require('./router/rout');
const errorMiddleware = require('./middlewares/error');



app.use(cookie());//можно использовать секретный ключ для шифрования

app.use(errorMiddleware);


*/
