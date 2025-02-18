const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://krisharora984:WkcWvLSEjddq10Y4@if.mqsa7.mongodb.net/?retryWrites=true&w=majority&appName=IF";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
};


module.exports = connectToMongo;