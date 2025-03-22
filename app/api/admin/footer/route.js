import Footer from "@/models/Footer";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  connectionToDb();
  try {
    const footer = await Footer.find();
    if (footer.length === 0) {
      return NextResponse.json({ message: "No Found!" });
    }
    return NextResponse.json(footer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[GET_FOOTER]" }, { status: 500 });
  }
}

export async function POST(req) {
  connectionToDb();
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ message: "Body is Empty!" });
    }

    const footer = new Footer(body);
    await footer.save();

    return NextResponse.json(footer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[GET_FOOTER]" }, { status: 500 });
  }
}
