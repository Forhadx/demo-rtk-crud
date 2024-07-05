import express from "express";
import productController from "../controllers/productController";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/create", [verifyToken], productController.createProduct);

router.patch("/update/:productId", productController.updateProduct);

router.get("/view-all", [verifyToken], productController.fetchProducts);

router.get("/view/:productId", [verifyToken], productController.viewProduct);

router.delete(
  "/delete/:productId",
  [verifyToken],
  productController.deleteProduct
);

export = router;
