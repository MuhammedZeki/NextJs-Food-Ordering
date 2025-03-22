import Categories from "@/models/Categories";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  connectionToDb();
  try {
    if (!params || !params.categoryId) {
      return NextResponse.json({ message: "Category ID is required" });
    }
    const deleted = await Categories.findByIdAndDelete(params.categoryId);
    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[CATEGORY_DELETE]" }, { status: 500 });
  }
}
