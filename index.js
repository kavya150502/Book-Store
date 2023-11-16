import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
//middleware for parsing req body
app.use(express.json());
//middleware for handling cors policy

//1.all
app.use(cors());
//2.custom originsnpm 
// app.use(cors({
//     origin:'https://localhost:3000',
//     methods:['GET','PUT','POST','DELETE'],
//     allowedHeaders:['Content-Type'],
// }));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('welcome');
});
app.use('/books',booksRoute);
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to DB');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    }
    )
    .catch((error=>{
        console.log(error);
    }));
