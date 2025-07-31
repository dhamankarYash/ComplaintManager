
import { type NextRequest, NextResponse } from "next/server";
import { ComplaintModel } from "@/lib/models/complaint";
import { verifyToken } from "@/lib/jwt";
// Make sure to import the email functions
import { sendEmail } from "@/lib/email";

// GET a single complaint by its ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const complaint = await ComplaintModel.findById(id);
    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 });
    }

    // Users can only see their own complaints, admins can see all
    if (payload.role !== "admin" && complaint.userId !== payload.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error("Get complaint error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// UPDATE a complaint and send an email notification
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
    }

    const updateData = await request.json();
    const updatedComplaint = await ComplaintModel.updateById(id, updateData);

    if (!updatedComplaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 });
    }

    // --- ✅ EMAIL NOTIFICATION ON UPDATE ---
    if (updatedComplaint) {
      const emailContent = {
        subject: `✅ Complaint Updated: ${updatedComplaint.id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8b5cf6;">Your Complaint has been Updated</h2>
            <p>The status of your complaint titled "<strong>${updatedComplaint.title}</strong>" has been changed.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Complaint Details:</h3>
              <p><strong>ID:</strong> ${updatedComplaint.id}</p>
              <p><strong>New Status:</strong> ${updatedComplaint.status}</p>
            </div>
            <p>You can view the latest details by tracking your complaint on our website.</p>
            <p>Best regards,<br>ComplaintMS Team</p>
          </div>
        `,
      };

      await sendEmail({
        to: updatedComplaint.userEmail,
        subject: emailContent.subject,
        html: emailContent.html,
      });
    }
    // --- End of email block ---

    return NextResponse.json({
      success: true,
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Update complaint error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE a complaint
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // ... (Your DELETE function remains the same)
}