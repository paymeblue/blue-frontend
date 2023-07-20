import transporter from "@config/nodemailer";
import { NextRequest, NextResponse } from "next/server";

// import Mailgun from "mailgun.js";

type RequestBody = {
  name: string;
  email: string;
  phone: string;
  msg: string;
};

type ContactMessageFields = {
  // eslint-disable-next-line no-unused-vars
  [Key in keyof RequestBody]: string;
};

const contactMessageFields: ContactMessageFields = {
  name: "Name",
  email: "Email",
  phone: "Phone Number",
  msg: "Message",
};

const generateEmailContent = (data: RequestBody) => {
  const stringedData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${
        contactMessageFields[key as keyof RequestBody]
      }: \n${val} \n \n`),
    ""
  );

  const htmlData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `
      <tr>
              <td class="bold">${
                contactMessageFields[key as keyof RequestBody]
              }</td>
              <td class="base">: ${val}</td>
            </tr>
      `),
    ""
  );

  return {
    text: stringedData,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Contact | Blue</title>
    <style>
      body {
        display: flex;
      }
      .main {
        width: 50%;
        height: 100%;
        margin: auto;
        padding: 1rem;
        color: rgb(3, 3, 37);
        text-align: left;
        border-radius: 6px;
      }
      .logo {
        width: 123px;
      }
      .rule {
        margin: 0.75rem auto;
        width: 95%;
      }
      .bold {
        font-size: 15px;
        font-weight: 600;
        margin-right: 1rem;
      }
      .base {
        font-size: 15px;
        font-weight: 500;
        margin-right: 1rem;
      }
      .footer {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <main class="main">
      <div style="margin: 1rem auto; text-align: center">
        <a href='https://paymeblue.com'><img src="cid:blue" alt="blue logo" class="logo" /></a>
      </div>
      <hr class="rule" />
      <section>
        <h2>Details...</h2>
        <table>
          <tbody>
            ${htmlData}
          </tbody>
        </table>
      </section>
      <hr class="rule" />
      <div class="footer">&copy; 2023 Blue</div>
    </main>
  </body>
</html>`,
  };
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  const message = {
    from: body.email,
    to: process.env.EMAIL,
    subject: `Message from Blue Web Contact Form`,
    ...generateEmailContent(body),
    attachments: [
      {
        filename: "logo.png",
        path: `${process.cwd()}/public/logo.png`,
        cid: "blue",
      },
    ],
  };

  try {
    await transporter.sendMail(message);
    return NextResponse.json(
      { success: true, msg: `Message sent successfully!` },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

// import formData from "form-data";

// export async function POST(request: NextRequest) {
//   const body: RequestBody = await request.json();

//   const mailgun = new Mailgun(formData);
//   const client = mailgun.client({ username: "api", key: process.env.API_KEY! });

//   const messageData = {
//     from: body.name + "<" + body.email + ">",
//     to: process.env.EMAIL,
//     subject: "Message from Blue Contact Form",
//     text: body.msg,
//   };

//   try {
//     const res = await client.messages.create(process.env.DOMAIN!, messageData);
//     return NextResponse.json(
//       { success: true, msg: `Message sent successfully! ${res.message}` },
//       {
//         status: 200,
//       }
//     );
//   } catch (error: any) {
//     console.log(error, "error from server");
//     return NextResponse.json({ error: error.message });
//   }
// }
