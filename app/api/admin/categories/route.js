import Categories from "@/models/Categories";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectionToDb();
    const categories = await Categories.find();
    if (!categories) {
      return NextResponse.json(
        { message: "No found Categories" },
        { status: 404 }
      );
    }
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[CATEGORİES_GET]" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectionToDb();
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const newCategory = new Categories({ title: body.title });
    await newCategory.save();
    return NextResponse.json(newCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[CATEGORİES_POST]" }, { status: 500 });
  }
}
