import { env } from "@/lib/private-env";
import { ServiceError, ValidationError } from "@/errors";
import { createTransport } from "nodemailer";

type EmailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

const emailTransporter = createTransport({
  host: env.SMTP_SERVER_HOST,
  port: Number(env.SMTP_SERVER_PORT),
  secure: env.NODE_ENV === "development" ? false : true,
  auth: {
    user: env.SMTP_SERVER_USER,
    pass: env.SMTP_SERVER_PASSWORD,
  },
});

async function sendMail(options: EmailOptions) {
  const optionsArray = Object.values(options);

  // checking if none of the options is missing
  for (const option of optionsArray) {
    if (!option) {
      throw new ValidationError({
        message: "Error validating e-mail fields.",
        action: "Please verify the data being sent.",
        stack: new Error().stack,
        statusCode: 400,
      });
    }
  }

  try {
    await emailTransporter.sendMail({
      ...options,
    });
  } catch (error) {
    throw new ServiceError({
      message: error.message || "E-mail service error.",
      stack: new Error().stack,
    });
  }
}

const exportsObject = {
  sendMail,
};

export default exportsObject;
