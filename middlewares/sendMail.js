import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification - Gelish</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f8ff; /* Light pastel blue background */
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: #4682b4; /* Pastel blue */
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            margin-bottom: 20px;
            color: #666666;
            font-size: 16px;
        }
        .otp {
            font-size: 40px;
            color: #87ceeb; /* Sky blue */
            font-weight: bold;
            margin-bottom: 30px;
        }
        .footer {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }
        .footer a {
            color: #4682b4; /* Pastel blue */
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification - Gelish</h1>
        <p>Hi ${data.name},</p>
        <p>Ini OTP kamu yaa untuk verifikasi:</p>
        <p class="otp">${data.otp}</p>
        <p>Kalo bukan kamu yang daftar silahkan abaikan aja email ini </p>
        <div class="footer">
            <p>Terimakasih sudah mengunjungi dan mendaftar di Gelish, lets improve together</p>
        </div>
    </div>
</body>
</html>`

  await transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html,
  });
};

export default sendMail;

export const sendForgotMail = async (subject, data) => {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.Gmail,
        pass: process.env.Password,
      },
    });
  
    const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f3f3f3;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 600px;
      }
      h1 {
        color: #5a2d82;
      }
      p {
        color: #666666;
      }
      .button {
        display: inline-block;
        padding: 15px 25px;
        margin: 20px 0;
        background-color: #5a2d82;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
      }
      .footer {
        margin-top: 20px;
        color: #999999;
        text-align: center;
      }
      .footer a {
        color: #5a2d82;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Reset Your Password</h1>
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click the button below to reset your password.</p>
      <a href="${process.env.frontendurl}/reset-password/${data.token}" class="button">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <div class="footer">
        <p>Thank you,<br>Your Website Team</p>
        <p><a href="https://yourwebsite.com">yourwebsite.com</a></p>
      </div>
    </div>
  </body>
  </html>
  `;
  
    await transport.sendMail({
      from: process.env.Gmail,
      to: data.email,
      subject,
      html,
    });
  };
  