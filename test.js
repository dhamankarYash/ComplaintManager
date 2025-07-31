require('dotenv').config(); // make sure this is at the top
const nodemailer = require('nodemailer');
console.log("SMTP_HOST =", process.env.SMTP_HOST);
console.log("SMTP_USER =", process.env.SMTP_USER);
console.log("SMTP_PASS =", process.env.SMTP_PASS);
async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // should be smtp.gmail.com
    port: Number(process.env.SMTP_PORT), // should be 465
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"ComplaintMS Team" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '✅ Nodemailer Email Test',
      html: '<p>This is a test email from your Nodemailer setup.</p>',
    });

    console.log('✅ Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

sendTestEmail();
