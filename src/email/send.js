import nodemailer from "nodemailer";
import template from "./template.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dennykate22@gmail.com",
    pass: "duqi hwsc umvt rojt",
  },
});

export default async (code, email) => {
  //   const date = getCurrentDate();

  if (!code) {
    throw "Code is required";
  }

  const options = {
    from: "dennykate22@gmail.com",
    to: email,
    subject: "Receive a verification code!",
    html: template({ code }),
  };

  const emailCode = () => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(options, (err, info) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(info.response);
      });
    });
  };

  const response = await emailCode();

  console.log(response);
  return response;
};

const getCurrentDate = () => {
  const currentDate = new Date();

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12;

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const year = currentDate.getFullYear();

  const formattedDate = `${formattedHours}:${minutes}${ampm} ${day}/${month}/${year}`;

  return formattedDate;
};
