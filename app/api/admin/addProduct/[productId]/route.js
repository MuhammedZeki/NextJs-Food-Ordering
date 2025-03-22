import Product from "@/models/Product";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  connectionToDb();
  try {
    if (!params || !params.productId) {
      return NextResponse.json({ message: "Id is required" });
    }
    const res = await Product.findById(params.productId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[PRODUCT_ID_GET]" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  connectionToDb();
  try {
    console.log(params.productId);
    if (!params || !params.productId) {
      return NextResponse.json({ message: "Product_Id is required" });
    }
    const res = await Product.findByIdAndDelete(params.productId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "[PRODUCT_ID_DELETE]" },
      { status: 500 }
    );
  }
}
