import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = request.body;
  console.log(body);
  const payload = {
    info: "Hello from NextJS!",
    data: body,
  };
  return NextResponse.json(payload, {
    status: 200,
  });
}
