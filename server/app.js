import cors from 'cors';
import express from 'express';
import homeRoute from './router/homeRoute.js';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const port = 8080;

const app = express();
connectDB();

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const clientPath = path.join(__dirname, '../client');
app.use(express.static(clientPath));


app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

app.use(homeRoute);

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});