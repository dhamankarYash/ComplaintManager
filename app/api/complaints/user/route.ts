import { type NextRequest, NextResponse } from "next/server"
import { ComplaintModel } from "@/lib/models/complaint"
import { verifyToken } from "@/lib/jwt"

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

    // Get user's complaints
    const complaints = await ComplaintModel.findByUserId(payload.userId)

    return NextResponse.json({
      success: true,
      complaints,
    })
  } catch (error) {
    console.error("Get user complaints error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
