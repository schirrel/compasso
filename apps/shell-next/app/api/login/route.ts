import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'cp_session';
const DEFAULT_MAX_AGE = 24 * 60 * 60; //  1 day in seconds


type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
    access_token: string,
    expires_in: number
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LoginBody | null;
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
    // @todo add log for missing settings
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
  try {
    const loginUrl = `${url}/login`;
    const result = await fetch(loginUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
    if (result.status === 401) {
        return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
    }
    if (result.ok) {
        const response =  await result.json() as LoginResponse;
        const cookiesStore = await cookies();
        cookiesStore.set({
            name: SESSION_COOKIE,
            maxAge: response.expires_in ?? DEFAULT_MAX_AGE,
            // httpOnly: true,
            domain: '.compass.local',            
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            value: response.access_token
        })
        return NextResponse.json({...response}, { status: 200 });

    }
  } catch (e) {
    return NextResponse.json({ message: "Internal Error" }, { status: 400 });
  }
}
