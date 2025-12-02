import { Router } from "express";
import { 
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from "../Controllers/product.controller";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);

router.patch("/:id", updateProduct); 
router.delete("/:id", deleteProduct);

export default router;
