import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import { validateEmail } from "../lib/validateEmail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUpUser = async (req: Request, res: Response) => {
  try {
    const checkEmailFormat = validateEmail(req.body.email);
    if (!checkEmailFormat) {
      return res.status(406).json({
        data: null,
        success: false,
        message: "Wrong email format!",
      });
    }

    const checkEmail = await UserModel.findOne({
      email: { $regex: `^${req.body.email}$`, $options: "i" },
    });
    if (checkEmail) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Email already exist!",
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 12);
    if (!hashPassword) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Something went wrong!",
      });
    }
    let userObj = {
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: hashPassword,
    };

    const userData = await UserModel.create(userObj);

    if (!userData) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Admin couldn't be created!",
      });
    }

    return res.status(201).json({
      data: userData,
      success: true,
      message: "User signup` successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred!",
    });
  }
};

const signInUser = async (req: Request, res: Response) => {
  try {
    const userData = await UserModel.findOne({ email: req.body.email });

    if (!userData) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "User not found!",
      });
    }

    const isEqual = await bcrypt.compare(req.body.password, userData.password);
    if (!isEqual) {
      return res.status(409).json({
        data: null,
        success: false,
        message: "Incorrect Password!",
      });
    }

    const token = jwt.sign(
      {
        data: {
          _id: userData?._id,
          email: userData?.email,
        },
      },
      process.env.TOKEN_SECRET!,
      { expiresIn: process.env.USER_EXPIRE_TIME }
    );

    return res.status(200).json({
      data: {
        user: userData,
        token,
      },
      success: true,
      message: "User sign-in Successful",
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred!",
    });
  }
};

const viewUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id ?? null;
    const userData = await UserModel.findOne(
      {
        _id: userId,
      },
      {
        password: 0,
      }
    );

    if (!userData) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      data: userData,
      success: true,
      message: "User view Successful",
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred!",
    });
  }
};

export default {
  signUpUser,
  signInUser,
  viewUser,
};
