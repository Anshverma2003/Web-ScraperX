import cors from 'cors';
import express from 'express';
import homeRoute from './router/homeRoute.js';
import dotenv from 'dotenv';
import { connectDB } from './db.js';

dotenv.config();

const port = 8080;

const app = express();
connectDB();

const corsOptions = {
    origin: '*', // Adjust the origin as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(homeRoute);

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
