"use server";

import { env } from "@/lib/private-env";
import { ServiceError, ValidationError } from "@/errors";
import { z, ZodError } from "zod";
import email from "@/models/email";

const contactFormSchema = z.object({
  subject: z.string(),
  message: z.string(),
});

export type SendContactEmailResponse = Awaited<
  ReturnType<typeof sendContactEmail>
>;

export async function sendContactEmail(
  customerEmail: string,
  formState,
  formData: FormData,
) {
  try {
    const subject = formData.get("subject");
    const message = formData.get("message");

    contactFormSchema.parse({
      subject: subject,
      message: message,
    });

    await email.sendMail({
      from: customerEmail,
      to: env.EMAIL_FROM, // so it goes to my e-mail address
      html: message as string,
      subject: subject as string,
      text: message as string,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      const errorData = {
        ...new ValidationError({
          message: error.message,
          stack: error.stack,
          action: error.issues[0].message,
          statusCode: 400,
        }).toJSON(),
        success: false,
      };

      return errorData;
    }

    if (error instanceof ServiceError) {
      const errorData = {
        ...error.toJSON(),
        success: false,
      };

      return errorData;
    }

    return {
      message: "Unknown error",
      action: "Please try again. If the error persists, contact the owner.",
      success: false,
    };
  }
}
