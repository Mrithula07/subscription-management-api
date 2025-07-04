import nodemailer from "nodemailer";
import { MAIL_PASSWORD } from "./env.js";

export const accountEmail = "mrithula04@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: MAIL_PASSWORD,
  },
});

export default transporter;
