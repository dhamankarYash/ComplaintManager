const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/complaint-system"

async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db("complaint-system")

    console.log("Connected to MongoDB")

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("complaints").deleteMany({})
    console.log("Cleared existing data")

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 12)
    const adminUser = await db.collection("users").insertOne({
      email: "admin@example.com",
      password: adminPassword,
      role: "admin",
      createdAt: new Date(),
    })
    console.log("Created admin user")

    // Create regular user
    const userPassword = await bcrypt.hash("user123", 12)
    const regularUser = await db.collection("users").insertOne({
      email: "user@example.com",
      password: userPassword,
      role: "user",
      createdAt: new Date(),
    })
    console.log("Created regular user")

    // Create sample complaints
    const sampleComplaints = [
      {
        title: "Product Quality Issue - Damaged Package",
        description:
          "The product I received was damaged during shipping. The box was crushed and the item inside was broken.",
        category: "Product",
        priority: "High",
        status: "Open",
        dateSubmitted: new Date(),
        updatedAt: new Date(),
        userId: regularUser.insertedId.toString(),
        userEmail: "user@example.com",
      },
      {
        title: "Billing Discrepancy - Double Charge",
        description: "I was charged twice for the same order #12345. Please refund the duplicate charge.",
        category: "Billing",
        priority: "Medium",
        status: "In Progress",
        dateSubmitted: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date(Date.now() - 43200000), // 12 hours ago
        userId: regularUser.insertedId.toString(),
        userEmail: "user@example.com",
      },
      {
        title: "Customer Service Response Time",
        description: "It took over 48 hours to get a response from customer service. This is unacceptable.",
        category: "Service",
        priority: "Low",
        status: "Resolved",
        dateSubmitted: new Date(Date.now() - 172800000), // 2 days ago
        updatedAt: new Date(Date.now() - 86400000), // 1 day ago
        userId: regularUser.insertedId.toString(),
        userEmail: "user@example.com",
      },
      {
        title: "Technical Issue - App Crashes",
        description:
          "The mobile app keeps crashing when I try to access my account. This happens on both iOS and Android.",
        category: "Technical",
        priority: "High",
        status: "Open",
        dateSubmitted: new Date(Date.now() - 3600000), // 1 hour ago
        updatedAt: new Date(Date.now() - 3600000),
        userId: regularUser.insertedId.toString(),
        userEmail: "user@example.com",
      },
    ]

    await db.collection("complaints").insertMany(sampleComplaints)
    console.log("Created sample complaints")

    // Create indexes for better performance
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("complaints").createIndex({ userId: 1 })
    await db.collection("complaints").createIndex({ status: 1 })
    await db.collection("complaints").createIndex({ priority: 1 })
    await db.collection("complaints").createIndex({ dateSubmitted: -1 })
    console.log("Created database indexes")

    console.log("\n✅ Database seeded successfully!")
    console.log("🔑 Admin credentials: admin@example.com / admin123")
    console.log("👤 User credentials: user@example.com / user123")
    console.log(`📊 Created ${sampleComplaints.length} sample complaints`)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
