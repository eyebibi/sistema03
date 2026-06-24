import { env } from "@/lib/private-env";
import email from "@/models/email";

function generateEmailHtml(customerEmail: string, customerRawPassword: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Discly!</title>
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
            Welcome to Discly!
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px 20px">
          <p style="font-size: 16px; color: #ffffff">Hello!</p>
          <p style="font-size: 16px; color: #ffffff">
            Welcome to Discly. Thank you for your trust!
          </p>
          <p style="font-size: 16px; color: #ffffff">
            Here are your login credentials:
          </p>
          <table
            cellpadding="10"
            cellspacing="0"
            style="
              width: 100%;
              background-color: #1c1e20;
              border-radius: 4px;
              margin-bottom: 20px;
            "
          >
            <tr>
              <td style="font-weight: bold; color: #ffffff">Email:</td>
              <td style="font-family: monospace; color: #ffffff">
                ${customerEmail}
              </td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #ffffff">Password:</td>
              <td style="font-family: monospace; color: #ffffff">
                ${customerRawPassword}
              </td>
            </tr>
          </table>
          <p style="font-size: 16px; color: #e53e3e; font-weight: bold">
            Important: Please change your password when you log in for the first
            time!
          </p>
          <p style="font-size: 16px; color: #ffffff">
            Your current password was randomly generated for security purposes.
            To keep your account secure, please update it to a strong
            and unique password of your choice.
          </p>
          <a
            href="${env.BASE_URL}/signin"
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
            >Sign in</a
          >
          <p style="font-size: 16px; color: #ffffff; margin-top: 30px">
            Now you can create servers, fast!
          </p>
          <p style="font-size: 16px; color: #ffffff">Discly Team</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

export async function sendFulfillmentEmail(
  customerEmail: string,
  customerRawPassword: string,
) {
  try {
    await email.sendMail({
      from: env.EMAIL_FROM,
      to: customerEmail,
      html: generateEmailHtml(customerEmail, customerRawPassword),
      subject: `Welcome to Discly!`,
      text: `You now have access to Discly.`,
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
}
