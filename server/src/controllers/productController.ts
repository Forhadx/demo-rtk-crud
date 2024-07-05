import { Request, Response } from "express";
import ProductModel from "../models/Product";
import UserModel from "../models/User";

const createProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id ?? null;
    const userData = await UserModel.findOne({
      _id: userId,
    });

    if (!userData) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "User not found!",
      });
    }

    const productData = await ProductModel.create({
      ...req.body,
      userId: req.user?._id,
    });

    if (!productData) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Product couldn't be created!",
      });
    }

    return res.status(201).json({
      data: productData,
      success: true,
      message: "Product created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred!",
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = await ProductModel.findOneAndUpdate(
      { _id: req.params.productId },
      { $set: req.body },
      { new: true }
    );

    if (!productData) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Product couldn't be updated!",
      });
    }

    return res.status(200).json({
      data: productData,
      success: true,
      message: "Product updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred!",
    });
  }
};

const fetchProducts = async (req: Request, res: Response) => {
  try {
    const productsData = await ProductModel.find(
      {
        userId: req.user?._id,
      },
      {
        _id: 1,
        title: 1,
        description: 1,
        price: 1,
        createdAt: 1,
      }
    ).sort({ createdAt: -1 });

    if (!productsData) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Products not found!",
      });
    }

    return res.status(200).json({
      data: productsData,
      success: true,
      message: "Products view Successful",
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred!",
    });
  }
};

const viewProduct = async (req: Request, res: Response) => {
  try {
    const productData = await ProductModel.findOne(
      {
        _id: req.params.productId,
        userId: req.user?._id,
      },
      {
        _id: 1,
        title: 1,
        description: 1,
        price: 1,
        createdAt: 1,
      }
    );

    if (!productData) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Product not found!",
      });
    }

    return res.status(200).json({
      data: productData,
      success: true,
      message: "Product view Successful",
    });
  } catch (err) {
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal Server Error Occurred!",
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productData = await ProductModel.findOneAndDelete({
      _id: req.params.productId,
      userId: req.user?._id,
    });

    if (!productData) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Failed to delete product!",
      });
    }

    return res.status(200).json({
      data: productData,
      success: true,
      message: "Product delete Successful",
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
  createProduct,
  updateProduct,
  fetchProducts,
  viewProduct,
  deleteProduct,
};
