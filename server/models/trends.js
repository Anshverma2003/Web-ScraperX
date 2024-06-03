import mongoose from "mongoose";

const trendSchema = new mongoose.Schema({

    trends: { type: [String], required: true },
    ip: { type: String, required: true },
    date: { type: String, required: true }
});

const Trend = mongoose.model("Trend", trendSchema);

export default Trend;