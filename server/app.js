import cors from 'cors';
import express from 'express';
import homeRoute from './router/homeRoute.js';

const port = 8080;
const app = express();


app.use(cors());
app.use(express.json());
app.use(homeRoute);

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
