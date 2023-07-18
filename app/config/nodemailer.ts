import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
export default transporter;

// host: "smtp.romandevexperts.com",
// // host: "mail.domain.com",
// port: 465,
// secure: true,
// auth: {
//   user: process.env.EMAIL,
//   pass: process.env.EMAIL_PASS,
// },
// tls: {
//   rejectUnauthorized: false,
// },
