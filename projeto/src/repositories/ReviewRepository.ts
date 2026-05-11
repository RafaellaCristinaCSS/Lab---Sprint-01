import prisma from "../database/client";
import { Review } from "../entities";

export class ReviewRepository {
    async create(data: any): Promise<Review> {
        return prisma.review.create({ data });
    }

    async findById(id: string): Promise<Review | null> {
        return prisma.review.findUnique({
            where: { id },
            include: {
                request: {
                    include: {
                        client: true,
                        provider: true,
                        category: true
                    }
                }
            }
        });
    }

    async findByRequestId(requestId: string): Promise<Review | null> {
        return prisma.review.findUnique({
            where: { requestId },
            include: {
                request: {
                    include: {
                        client: true,
                        provider: true,
                        category: true
                    }
                }
            }
        });
    }

    async findAll(): Promise<Review[]> {
        return prisma.review.findMany({
            include: {
                request: {
                    include: {
                        client: true,
                        provider: true,
                        category: true
                    }
                }
            }
        });
    }

    async update(id: string, data: any): Promise<Review> {
        return prisma.review.update({
            where: { id },
            data,
            include: {
                request: {
                    include: {
                        client: true,
                        provider: true,
                        category: true
                    }
                }
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.review.delete({ where: { id } });
    }
}
