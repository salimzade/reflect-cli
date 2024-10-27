import mongoose from "mongoose";

async function connect() {
    try {
        const databaseURI = process.env.MONGODB_URI;
        await mongoose.connect(databaseURI);
        console.info("Connected to MongoDB");
    } catch (e) {
        console.error("Failed to connect to MongoDB");
        process.exit(1);
    }
}

export default connect;