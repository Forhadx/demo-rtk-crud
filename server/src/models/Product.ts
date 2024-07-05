import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
  title: string;
  description: string;
  price: number;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      index: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    index: true,
  }
);

export default mongoose.model<IProductModel>("product", ProductSchema);
