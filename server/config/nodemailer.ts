import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.EMAIL_PASSWORD) {
  throw new Error("EMAIL_PASSWORD is not defined");
}

export const transporter = nodemailer.createTransport({
  host: "smtp.ionos.fr", // SMTP au lieu de IMAP
  port: 465,
  secure: true,
  auth: {
    user: "contact@quentinsautiere.com",
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
