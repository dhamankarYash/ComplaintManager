interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail(options: EmailOptions) {
  // Mock email sending - replace with real email service later
  console.log("Mock email sent:", {
    to: options.to,
    subject: options.subject,
    html: options.html,
  })

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true, messageId: `mock-${Date.now()}` }
}

export function generateComplaintConfirmationEmail(complaintId: string, title: string) {
  return {
    subject: `Complaint Confirmation - ${complaintId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8b5cf6;">Complaint Received</h2>
        <p>Thank you for submitting your complaint. We have received it and will process it shortly.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Complaint Details:</h3>
          <p><strong>ID:</strong> ${complaintId}</p>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Status:</strong> Open</p>
        </div>
        <p>You can track your complaint progress at any time by visiting our tracking page.</p>
        <p>Best regards,<br>ComplaintMS Team</p>
      </div>
    `,
  }
}
