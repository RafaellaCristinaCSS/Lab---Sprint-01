import { ServiceCategoryRepository } from "../repositories/ServiceCategoryRepository";
import { ServiceCategory } from "../entities";

export class ServiceCategoryService {
    private serviceCategoryRepository: ServiceCategoryRepository;

    constructor() {
        this.serviceCategoryRepository = new ServiceCategoryRepository();
    }

    async createCategory(data: {
        name: string;
        description: string;
    }): Promise<ServiceCategory> {
        return this.serviceCategoryRepository.create(data);
    }

    async getCategoryById(id: string): Promise<ServiceCategory | null> {
        return this.serviceCategoryRepository.findById(id);
    }

    async getAllCategories(): Promise<ServiceCategory[]> {
        return this.serviceCategoryRepository.findAll();
    }

    async updateCategory(id: string, data: Partial<ServiceCategory>): Promise<ServiceCategory> {
        const category = await this.serviceCategoryRepository.findById(id);
        if (!category) {
            throw new Error("Category not found");
        }

        return this.serviceCategoryRepository.update(id, data);
    }

    async deleteCategory(id: string): Promise<void> {
        const category = await this.serviceCategoryRepository.findById(id);
        if (!category) {
            throw new Error("Category not found");
        }

        await this.serviceCategoryRepository.delete(id);
    }
}
