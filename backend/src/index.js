import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/booksRoutes.js";
import cors from "cors";
import { connectBD } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

connectBD();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Allow All Origins with Default of cors
app.use(cors());

//Allow costom origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// )

app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

