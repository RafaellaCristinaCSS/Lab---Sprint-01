import { Request, Response } from "express";
import { ServiceCategoryService } from "../services/ServiceCategoryService";

export class ServiceCategoryController {
    private serviceCategoryService: ServiceCategoryService;

    constructor() {
        this.serviceCategoryService = new ServiceCategoryService();
    }

    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const { name, description } = req.body;

            const category = await this.serviceCategoryService.createCategory({
                name,
                description
            });

            res.status(201).json({
                message: "Category created successfully",
                data: category
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const category = await this.serviceCategoryService.getCategoryById(id);

            if (!category) {
                res.status(404).json({
                    error: "Category not found"
                });
                return;
            }

            res.status(200).json({
                data: category
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.serviceCategoryService.getAllCategories();

            res.status(200).json({
                data: categories,
                count: categories.length
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const category = await this.serviceCategoryService.updateCategory(id, updateData);

            res.status(200).json({
                message: "Category updated successfully",
                data: category
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            await this.serviceCategoryService.deleteCategory(id);

            res.status(200).json({
                message: "Category deleted successfully"
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}
