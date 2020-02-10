/**
 ** Developed by BakaNate
 ** on 10/02/2020
 ** For project JSHoneypot
 ** Copyright (c) 2020. All right reserved.
 */

import nodemailer from 'nodemailer';

const sendMail = async (mailAddress, mailSubject, mailBody) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: mailAddress,
    subject: mailSubject,
    text: mailBody,
  });
  console.log(`Mail sent ${JSON.stringify(info)}`);
};

module.exports = {
  sendMail,
};
