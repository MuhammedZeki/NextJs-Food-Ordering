import Product from "@/models/Product";
import connectionToDb from "@/util/mongooseDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectionToDb();
  try {
    const products = await Product.find();
    if (!products) {
      return NextResponse.json({ message: "No found product" });
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: ["PRODUCT"] }, { status: 500 });
  }
}

export async function POST(req) {
  await connectionToDb();
  try {
    const body = await req.json();
    console.log("gelen ürün", body);
    const newProduct = new Product(body);
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("Ürün Eklenirken Hata oluştu", error);
    return NextResponse.json(
      { message: ["PRODUCT_ADD"], error: error.message },
      { status: 500 }
    );
  }
}
