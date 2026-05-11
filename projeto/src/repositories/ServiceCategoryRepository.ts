import prisma from "../database/client";
import { ServiceCategory } from "../entities";

export class ServiceCategoryRepository {
    async create(data: any): Promise<ServiceCategory> {
        return prisma.serviceCategory.create({ data });
    }

    async findById(id: string): Promise<ServiceCategory | null> {
        return prisma.serviceCategory.findUnique({ where: { id } });
    }

    async findAll(): Promise<ServiceCategory[]> {
        return prisma.serviceCategory.findMany();
    }

    async update(id: string, data: any): Promise<ServiceCategory> {
        return prisma.serviceCategory.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.serviceCategory.delete({ where: { id } });
    }
}
