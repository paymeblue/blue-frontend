import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const ip =
    req.headers.get("CF-Connecting-IP") || req.headers.get("x-forwarded-for");
  const token = data["cf-turnstile-response"];

  if (!token) {
    return NextResponse.json("Captcha token is missing", { status: 400 });
  }

  const formData = new FormData();
  formData.append("secret", "0x4AAAAAAAL2hjxgDJcdDEeXVLa4UEQElmY");
  formData.append("response", token);
  formData.append("remoteip", ip as string);

  // Validate the token by calling the siteverify API endpoint
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  );
  const verifyTokenResult = await response.json();

  if (verifyTokenResult.success) {
    // Transform the data to match the expected format for the business backend
    const transformedData = {
      business_name: data.businessName,
      business_type: data.businessType,
      business_category: data.businessCategory,
      business_address: data.businessAddress,
      state: data.state,
      branch_count: data.branchCount,
      business_website: data.businessWebsite || "",

      contact_name: data.fullName,
      contact_role: data.role,
      contact_phone: `${data.phoneCode}${data.phoneNumber}`,
      contact_email: data.email || "",

      accepts_digital_payments: data.acceptsDigitalPayments === "Yes",
      payment_tools: data.currentPaymentTools,
      monthly_transactions: data.monthlyTransactions,
      employee_count: data.employeeCount || "",

      setup_needs: data.setupNeeds || [],
    };

    try {
      // Send the transformed data to the external API
      const externalApiRequest = await fetch(
        "https://blue-business-backend-8c46f2828f9e.herokuapp.com/api/business-onboarding",
        {
          method: "POST",
          body: JSON.stringify(transformedData),
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await externalApiRequest.json();
      if (externalApiRequest.ok) {
        return NextResponse.json(result);
      } else {
        return NextResponse.json(result, { status: externalApiRequest.status });
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to connect to business backend" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      `Captcha token invalid! Please refresh Captcha ${
        !verifyTokenResult.success ? verifyTokenResult["error-codes"][0] : null
      }`,
      {
        status: 500,
      }
    );
  }
}
