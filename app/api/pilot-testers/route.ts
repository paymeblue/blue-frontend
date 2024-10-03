import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.formData();
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
      "https://blue-api-backend.herokuapp.com/api/pilot-testers",
      {
        method: "POST",
        body: JSON.stringify({
          first_name: data.get("firstname"),
          last_name: data.get("lastname"),
          email: data.get("email"),
          phone: `${data.get("code")}${data.get("number")}`,
          platform: data.get("platform"),
        }),
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
