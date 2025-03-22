import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: {
            type: String,
          },
          price: {
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
