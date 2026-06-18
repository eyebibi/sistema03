import { randomBytes } from "node:crypto";
import { prisma } from "@discly/db";
import { ServiceError } from "@/errors";
import { generateHashedPassword } from "@/app/actions/generateHashedPassword";

export async function createCustomerAccount(
  customerEmail: string,
  customerPlan: "BASIC" | "COMPLETE",
) {
  try {
    const randomPassword = randomBytes(8).toString("hex");

    const hashedRandomPassword = await generateHashedPassword(randomPassword);

    console.log("customerEmail", customerEmail);

    await prisma.user.upsert({
      create: {
        email: customerEmail,
        password: hashedRandomPassword,
        plan: customerPlan,
      },
      update: {
        email: customerEmail,
        password: hashedRandomPassword,
        plan: customerPlan,
      },
      where: {
        email: customerEmail,
      },
    });

    return {
      rawPassword: randomPassword,
    };
  } catch (error) {
    const formattedError = new ServiceError({
      message: error.message || "Error creating customer account.",
      stack: new Error().stack,
      action:
        "Check the customer data. Did he use an e-mail addres that was already used?",
    });

    // logging errors
    console.log(error);
    console.log(error.stack);
    console.log(formattedError);

    throw formattedError;
  }
}
