import User from "@/models/User";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectionToDb();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 }, { message: "Success" });
  } catch (error) {
    return NextResponse.json(
      { message: "[USER]", error: error.message },
      { status: 500 }
    );
  }
}
