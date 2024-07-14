import mongoose from "mongoose";
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
async function disConnectFromDatabase() {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB successfully");
    }
    catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
    }
}
export { connectToDatabase, disConnectFromDatabase };
//# sourceMappingURL=connection.js.map