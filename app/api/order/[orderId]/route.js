import Order from "@/models/Order";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  connectionToDb();
  try {
    const { orderId } = params;
    if (!params || orderId) {
      return NextResponse.json({ message: "Order id is required" });
    }
    const res = await Order.findByIdAndDelete(orderId);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[ORDER_ID_DELETE]" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  connectionToDb();
  try {
    const { orderId } = params;
    if (!params || orderId) {
      return NextResponse.json({ message: "Order id is required" });
    }
    const res = await Order.findById(orderId);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[ORDER_ID_GET]" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  connectionToDb();
  try {
    const { orderId } = params;
    const body = await req.json();
    const res = await Order.findByIdAndUpdate(orderId, body, {
      new: true,
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[ORDER_ID_PUT]" }, { status: 500 });
  }
}
