import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ email, subject, text }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
    // console.log("Email sent");
    return { message: "Email sent successfully", status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};
