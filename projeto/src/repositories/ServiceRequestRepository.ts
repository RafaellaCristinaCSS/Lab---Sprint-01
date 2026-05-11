import prisma from "../database/client";
import { ServiceRequest } from "../entities";

export class ServiceRequestRepository {
    async create(data: any): Promise<ServiceRequest> {
        return prisma.serviceRequest.create({ data });
    }

    async findById(id: string): Promise<ServiceRequest | null> {
        return prisma.serviceRequest.findUnique({
            where: { id },
            include: {
                client: true,
                provider: true,
                category: true,
                reviews: true
            }
        });
    }

    async findAll(): Promise<ServiceRequest[]> {
        return prisma.serviceRequest.findMany({
            include: {
                client: true,
                provider: true,
                category: true,
                reviews: true
            }
        });
    }

    async findByStatus(status: string): Promise<ServiceRequest[]> {
        return prisma.serviceRequest.findMany({
            where: { status },
            include: {
                client: true,
                provider: true,
                category: true,
                reviews: true
            }
        });
    }

    async findByClientId(clientId: string): Promise<ServiceRequest[]> {
        return prisma.serviceRequest.findMany({
            where: { clientId },
            include: {
                client: true,
                provider: true,
                category: true,
                reviews: true
            }
        });
    }

    async findByProviderId(providerId: string): Promise<ServiceRequest[]> {
        return prisma.serviceRequest.findMany({
            where: { providerId },
            include: {
                client: true,
                provider: true,
                category: true,
                reviews: true
            }
        });
    }

    async update(id: string, data: any): Promise<ServiceRequest> {
        return prisma.serviceRequest.update({
            where: { id },
            data,
            include: {
                client: true,
                provider: true,
                category: true,
                reviews: true
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.serviceRequest.delete({ where: { id } });
    }
}
