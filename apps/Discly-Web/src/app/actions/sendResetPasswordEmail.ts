"use server";

import { NotFoundError } from "@/errors";
import { generatePasswordResetId } from "./generatePasswordResetId";
import { getUserByEmail } from "./getUserByEmail";
import email from "@/models/email";
import { logger } from "@/lib/logger";

function getEmailHtml(resetPasswordLink: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Discly</title>
  </head>
  <body
    style="
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      background-color: #23272a;
      margin: 0;
      padding: 0;
    "
  >
    <table
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="
        max-width: 600px;
        margin: 20px auto;
        background-color: #23272a;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      "
    >
      <tr>
        <td
          style="
            padding: 40px 20px;
            text-align: center;
            background-color: #1c1e20;
            color: #ffffff;
          "
        >
          <h1 style="margin: 0; font-size: 28px; font-weight: bold">
            Redefinir senha do Discly
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px 20px">
          <p style="font-size: 16px; color: #ffffff">Olá!</p>
          <p style="font-size: 16px; color: #ffffff">
            Foi solicitada uma redefinição de senha para este endereço de e-mail
          </p>
          <p style="font-size: 16px; color: #ffffff">
            Aqui está o link para redefinir sua senha:
          </p>
          <a
            href="${resetPasswordLink}"
            style="
              display: inline-block;
              background-color: #5865f2;
              color: #ffffff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 4px;
              font-weight: bold;
              margin-top: 20px;
            "
            >Redefinir senha</a
          >
          <p style="font-size: 16px; color: #ffffff; margin-top: 30px">
            Obrigado por usar o Discly!
          </p>
          <p style="font-size: 16px; color: #ffffff">Equipe Discly</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

async function generatePasswordResetEmail(userEmail: string) {
  try {
    const existingUser = await getUserByEmail(userEmail);

    // if there's no customer with that e-mail
    if (!existingUser) {
      throw new NotFoundError({
        message: "The provided e-mail address is not in our database.",
        stack: new Error().stack,
        action: "Please check if the e-mail address is correct.",
      });
    }

    // generate password reset id for that e-mail
    const { id } = await generatePasswordResetId(userEmail);

    // generate password reset link
    const passwordResetLink =
      process.env.VERCEL_ENV === "production"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${id}`
        : `${process.env.VERCEL_URL || "localhost:3000"}/reset-password/${id}`;

    const emailOptions = {
      from: process.env.EMAIL_FROM,
      html: getEmailHtml(passwordResetLink),
      subject: `Redefinir senha - Discly`,
      text: `Redefina sua senha`,
      to: userEmail,
    };

    return emailOptions;
  } catch (error) {
    throw error;
  }
}

export async function sendResetPasswordEmail(userEmail: string) {
  try {
    const emailOptions = await generatePasswordResetEmail(userEmail);

    // send e-mail
    await email.sendMail(emailOptions);

    await logger.logPasswordResetRequest({
      userEmail,
      timestamp: new Date().toLocaleString("pt-BR"),
    });

    // return success message
    return {
      message:
        "An e-mail containing password reset information was sent to the provided e-mail address.",
    };
  } catch (error) {
    console.log(error);

    if (error instanceof NotFoundError) {
      return {
        error: error.action,
      };
    }

    return {
      error:
        "There was a problem sending the e-mail, please try again. If the error persists, contact the owner.",
    };
  }
}
