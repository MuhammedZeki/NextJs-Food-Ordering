import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: {
        day: { type: String },
        hour: { type: String },
      },
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Footer || mongoose.model("Footer", FooterSchema);
