import Footer from "@/models/Footer";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  connectionToDb();
  try {
    const { footerId } = params;
    if (!footerId) {
      return NextResponse.json({ message: "Footer Id is required" });
    }
    const footer = await Footer.findById(footerId);

    return NextResponse.json(footer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[GET_FOOTER_ID]" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  connectionToDb();
  try {
    const { footerId } = params;
    if (!footerId) {
      return NextResponse.json({ message: "Footer Id is required" });
    }

    const body = await req.json();
    if (!body) {
      return NextResponse.json({ message: "Body is Empty!" });
    }

    const footer = await Footer.findByIdAndUpdate(footerId, body, {
      new: true,
    });

    return NextResponse.json(footer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[GET_FOOTER_ID]" }, { status: 500 });
  }
}
