import { Router } from "express";
import { ServiceCategoryController } from "../controllers/ServiceCategoryController";
import { validateRequest } from "../validations/validateRequest";
import { createCategorySchema } from "../validations/schemas";

const router = Router();
const serviceCategoryController = new ServiceCategoryController();

router.post("/", validateRequest(createCategorySchema), (req, res) =>
    serviceCategoryController.createCategory(req, res)
);
router.get("/", (req, res) => serviceCategoryController.getAllCategories(req, res));
router.get("/:id", (req, res) => serviceCategoryController.getCategoryById(req, res));
router.put("/:id", (req, res) => serviceCategoryController.updateCategory(req, res));
router.delete("/:id", (req, res) => serviceCategoryController.deleteCategory(req, res));

export default router;
