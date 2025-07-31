// lib/email.ts

import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// The real, working sendEmail function
export async function sendEmail(options: EmailOptions) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
},
  });

  const mailOptions = {
    from: `"ComplaintMS Team" <${process.env.SMTP_USER}>`, // ✅ correct

    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully! Message ID:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, messageId: null };
  }
}

// The exported email template generator function
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
  };
}