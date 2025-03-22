import User from "@/models/User";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

const bcrypt = require("bcrypt");
export async function GET(req, { params }) {
  connectionToDb();
  try {
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "[USER_ID]" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  connectionToDb();

  try {
    const { userId } = params;

    const body = await req.json();

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[USER_UPDATE]" }, { status: 500 });
  }
}
