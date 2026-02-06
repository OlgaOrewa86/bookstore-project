import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRouter from "./routes/booksRoute.js"; 
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const mongoBDURL = process.env.MONGODB_URL;

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

app.get('/',(req, res) => {
    return res.status(200).send('Welcome to BookStore')

});

app.use('/books', bookRouter);



mongoose.connect(mongoBDURL).then((result) => {
    console.log('App connected to database')
    app.listen(PORT, ()=>{
    console.log(`App is listening to port: ${PORT}`);
})
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
});
