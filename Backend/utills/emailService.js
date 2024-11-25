import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "akashsahabanaul@gmail.com",
    pass: "mgirkfmbcugxqfvu",
  },
});

export const sendEmail = async ({ email, subject, text }) => {
  try {
    // const { email, subject, text } = req.body;
    console.log(email, subject, text);
    await transporter.sendMail({
      from: "akashsahabanaul@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent");
    return { message: "Email sent successfully", status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};
