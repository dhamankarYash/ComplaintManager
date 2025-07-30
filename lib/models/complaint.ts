import { ObjectId, type WithId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"

export interface Complaint {
  _id?: ObjectId
  title: string
  description: string
  category: "Product" | "Service" | "Support" | "Billing" | "Technical" | "Other"
  priority: "Low" | "Medium" | "High"
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  dateSubmitted: Date
  updatedAt: Date
  userId: string
  userEmail: string
}

export interface ComplaintResponse {
  id: string
  title: string
  description: string
  category: string
  priority: string
  status: string
  createdAt: string
  updatedAt: string
  userId: string
  userEmail: string
}

export class ComplaintModel {
  static async create(
    complaintData: Omit<Complaint, "_id" | "dateSubmitted" | "updatedAt" | "status">,
  ): Promise<ComplaintResponse> {
    const db = await getDatabase()

    const complaint: Omit<Complaint, "_id"> = {
      ...complaintData,
      status: "Open",
      dateSubmitted: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Complaint>("complaints").insertOne(complaint)

    return this.formatComplaint({
      ...complaint,
      _id: result.insertedId,
    })
  }

  static async findAll(): Promise<ComplaintResponse[]> {
    const db = await getDatabase()
    const complaints = await db.collection<Complaint>("complaints").find({}).sort({ dateSubmitted: -1 }).toArray()

    return complaints.map(this.formatComplaint)
  }

  static async findByUserId(userId: string): Promise<ComplaintResponse[]> {
    const db = await getDatabase()
    const complaints = await db
      .collection<Complaint>("complaints")
      .find({ userId })
      .sort({ dateSubmitted: -1 })
      .toArray()

    return complaints.map(this.formatComplaint)
  }

  static async findById(id: string): Promise<ComplaintResponse | null> {
    const db = await getDatabase()
    const complaint = await db.collection<Complaint>("complaints").findOne({ _id: new ObjectId(id) })

    return complaint ? this.formatComplaint(complaint) : null
  }

  static async updateById(id: string, updates: Partial<Complaint>): Promise<ComplaintResponse | null> {
    const db = await getDatabase()

    const result = await db.collection<Complaint>("complaints").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    )

    return result ? this.formatComplaint(result) : null
  }

  static async deleteById(id: string): Promise<boolean> {
    const db = await getDatabase()
    const result = await db.collection<Complaint>("complaints").deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  static async getStats() {
    const db = await getDatabase()
    const pipeline = [
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]

    const statusCounts = await db.collection<Complaint>("complaints").aggregate(pipeline).toArray()
    const total = await db.collection<Complaint>("complaints").countDocuments()

    const stats = {
      total,
      open: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
    }

    statusCounts.forEach((item: any) => {
      switch (item._id) {
        case "Open":
          stats.open = item.count
          break
        case "In Progress":
          stats.inProgress = item.count
          break
        case "Resolved":
          stats.resolved = item.count
          break
        case "Closed":
          stats.closed = item.count
          break
      }
    })

    return stats
  }

  private static formatComplaint(complaint: WithId<Complaint>): ComplaintResponse {
    // Fallback for createdAt: use dateSubmitted, or the timestamp from the MongoDB ObjectId
    const createdAt = (complaint.dateSubmitted || complaint._id.getTimestamp()).toISOString()

    // Fallback for updatedAt: use updatedAt, or dateSubmitted, or the timestamp from the MongoDB ObjectId
    const updatedAt = (complaint.updatedAt || complaint.dateSubmitted || complaint._id.getTimestamp()).toISOString()

    return {
      id: complaint._id.toString(),
      title: complaint.title,
      description: complaint.description,
      category: complaint.category,
      priority: complaint.priority,
      status: complaint.status,
      createdAt: createdAt,
      updatedAt: updatedAt,
      userId: complaint.userId,
      userEmail: complaint.userEmail,
    }
  }
}
