import express from "express";
import userController from "../controllers/userController";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/signup", userController.signUpUser);

router.post("/signin", userController.signInUser);

router.get("/view", [verifyToken], userController.viewUser);

export = router;
