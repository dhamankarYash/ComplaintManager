import { type NextRequest, NextResponse } from "next/server"
import { ComplaintModel } from "@/lib/models/complaint"
import { verifyToken } from "@/lib/jwt"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { title, description, category, priority } = await request.json()

    if (!title || !description || !category || !priority) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create complaint
    const complaint = await ComplaintModel.create({
      title,
      description,
      category,
      priority,
      userId: payload.userId,
      userEmail: payload.email,
    })

    return NextResponse.json({
      success: true,
      complaint,
    })
  } catch (error) {
    console.error("Create complaint error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Admin can see all complaints, users see only their own
    const complaints =
      payload.role === "admin" ? await ComplaintModel.findAll() : await ComplaintModel.findByUserId(payload.userId)

    return NextResponse.json({
      success: true,
      complaints,
    })
  } catch (error) {
    console.error("Get complaints error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
