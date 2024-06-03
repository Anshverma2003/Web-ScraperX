import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to database.");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

export { connectDB };
