import { NextResponse } from "next/server";

const cookie = require("cookie");
export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const res = NextResponse.json({ message: "Login Success" });

      res.cookies.set("token", process.env.ADMIN_TOKEN, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      return res;
    }
  } catch (error) {
    return NextResponse.json(
      { message: "ADMIN LOGIN FAILED", error: error.message },
      { status: 500 }
    );
  }
}
