import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IDecodeUser {
  _id: string;
  email: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User (Token Required).",
    });
  }

  const token = authorizationHeader.replace(/^Bearer\s/, "");
  if (!token) {
    return res.status(401).json({ success: false, message: "Token Missing" });
  }

  try {
    jwt.verify(token, process.env.TOKEN_SECRET!, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Forbidden",
        });
      }

      if (decoded && typeof decoded === "object") {
        req.user = decoded.data as IDecodeUser;
      }

      next();
    });
  } catch (err) {
    return next(err);
  }
};

export default verifyToken;
