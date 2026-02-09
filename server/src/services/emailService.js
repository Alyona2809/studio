const nodemailer = require("nodemailer");
const {
  getRegistrationContent,
  getPasswordResetContent,
  getBookingNotificationContent,
} = require("./emailTemplates");

class EmailService {
  static getTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  static async sendVerificationCode(email, code, purpose = "registration") {
    const transporter = this.getTransporter();
    const content =
      purpose === "registration"
        ? getRegistrationContent(code)
        : getPasswordResetContent(code);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: content.subject,
      text: content.text,
      html: content.html,
    });
  }

  static async sendBookingNotification({ name, phone, email }) {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (!adminEmail) {
      throw new Error("ADMIN_EMAIL или SMTP_USER не задан в .env");
    }
    const transporter = this.getTransporter();
    const content = getBookingNotificationContent({ name, phone, email });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: adminEmail,
      subject: content.subject,
      text: content.text,
      html: content.html,
    });
  }
}

module.exports = EmailService;
