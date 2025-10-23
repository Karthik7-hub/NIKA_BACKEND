import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log(" MongoDB connected successfully.");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log(" MongoDB disconnected.");
        });

        console.log(process.env.MONGODB_URL);
        const connect = await mongoose.connect(`${process.env.MONGODB_URL}nika`);
        console.log(`Database Connected : ${connect.connection.host},${connect.connection.name}`);

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;