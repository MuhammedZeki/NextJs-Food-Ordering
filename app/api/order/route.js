import Order from "@/models/Order";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  connectionToDb();
  try {
    const res = await Order.find();
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[ORDER_GET]" }, { status: 500 });
  }
}

export async function POST(req) {
  connectionToDb();
  try {
    const body = await req.json();
    const res = await new Order(body);
    await res.save();
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[ORDER_POST]" }, { status: 500 });
  }
}
