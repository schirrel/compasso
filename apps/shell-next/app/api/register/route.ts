import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE = "cp_session";
const DEFAULT_MAX_AGE = 900; // Matches services\identidade-dotnet\Controllers\AccountController.cs

type registerBody = {
  email: string;
  password: string;
};

type registerResponse = {
  access_token: string;
  expires_in: number;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as registerBody | null;
  if (
    !body ||
    typeof body.email !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json(
      { message: "E-mail and password are required." },
      { status: 400 },
    );
  }
  const url = process.env.IDENTITY_API_URL;
  if (!url) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
  try {
    const registerUrl = `${url}/register`;

    const result = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (result.ok) {
      return NextResponse.json({ status: 201 });
    }
    const response = (await result.json()) as registerResponse;
    return NextResponse.json(response, {status: 400});
  } catch (e) {
    return NextResponse.json({ message: "Internal Error" }, { status: 400 });
  }
}
