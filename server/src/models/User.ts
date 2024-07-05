import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
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

export default mongoose.model<IUserModel>("user", UserSchema);
