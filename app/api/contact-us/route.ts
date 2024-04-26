import { TSchema, capitalizeFirstLetter, schema } from "@lib/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.formData();

  const fields = [
    "firstname",
    "lastname",
    "code",
    "number",
    "email",
    "message",
  ];
  const formDataValues: Partial<TSchema> | any = {};
  fields.forEach((field) => {
    const value = data.get(field);
    if (value !== null) {
      formDataValues[field] = value as TSchema[keyof TSchema];
    }
  });
  const parsedData: any = schema.safeParse(formDataValues);
  const name = parsedData.data.firstname + " " + parsedData.data.lastname;
  const fullname = capitalizeFirstLetter(name);
  const reqData = {
    fullname,
    phone: parsedData.data.code + parsedData.data.number,
    email: parsedData.data.email,
    message: parsedData.data.message,
  };
  if (!parsedData.success) {
    // Handle validation errors
    return new NextResponse(parsedData.error as any, { status: 400 });
  }
  const body = JSON.stringify({ ...reqData, type: "blue" });

  const ip = req.headers.get("CF-Connecting-IP");
  // const ip = req.headers.get("x-forwarded-for") as string;
  const token = data.get("cf-turnstile-response");

  const formData = new FormData();
  formData.append("secret", "0x4AAAAAAAL2hjxgDJcdDEeXVLa4UEQElmY");
  formData.append("response", token as string);
  formData.append("remoteip", ip as string);

  // Validate the token by calling the siteverify API endpoint.
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  );
  const verifyTokenResult = await response.json();

  if (verifyTokenResult.success) {
    // Now call the send the original body to the external API
    const externalApiRequest = await fetch(
      "https://sower-api-backend-0efb2dc250e6.herokuapp.com/api/contact-us",
      {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = await externalApiRequest.json();
    if (externalApiRequest.ok) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: externalApiRequest.status });
    }
  } else {
    return NextResponse.json(
      `Captcha token invalid!. Please refresh Captcha ${
        !verifyTokenResult.success ? verifyTokenResult["error-codes"][0] : null
      }`,
      {
        status: 500,
      }
    );
  }
}
