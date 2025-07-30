require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
console.log("🔍 Loaded URI:", uri); // <-- Add this line

async function testConnection() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected successfully to MongoDB!");
    await client.close();
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
  }
}

testConnection();
