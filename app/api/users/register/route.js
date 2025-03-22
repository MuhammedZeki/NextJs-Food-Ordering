export const runtime = "nodejs";

import User from "@/models/User";
import connectionToDb from "@/util/mongooseDb";
const bcrypt = require("bcrypt");
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectionToDb();

    const body = await request.json();

    const user = await User.findOne({ email: body.email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await new User({
      ...body,
      password: await bcrypt.hash(body.password, 10),
      confirmPassword: await bcrypt.hash(body.confirmPassword, 10),
    });
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "[USER_REGISTER]", error: error.message },
      { status: 500 }
    );
  }
}
