import { ServiceRequestRepository } from "../repositories/ServiceRequestRepository";
import { ServiceCategoryRepository } from "../repositories/ServiceCategoryRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ServiceRequest } from "../entities";
import { ServiceRequestCreatedProducer } from "../producers/serviceRequestCreated.producer";
import { ServiceRequestCreatedEvent } from "../types/events";

export class ServiceRequestService {
    private serviceRequestRepository: ServiceRequestRepository;
    private serviceCategoryRepository: ServiceCategoryRepository;
    private userRepository: UserRepository;
    private serviceRequestCreatedProducer: ServiceRequestCreatedProducer;

    constructor() {
        this.serviceRequestRepository = new ServiceRequestRepository();
        this.serviceCategoryRepository = new ServiceCategoryRepository();
        this.userRepository = new UserRepository();
        this.serviceRequestCreatedProducer = new ServiceRequestCreatedProducer();
    }

    async createServiceRequest(data: {
        clientId: string;
        categoryId: string;
        title: string;
        description: string;
        scheduledDate: Date;
        estimatedPrice?: number;
    }): Promise<ServiceRequest> {
        const client = await this.userRepository.findById(data.clientId);
        if (!client || client.userType !== "CLIENT") {
            throw new Error("Invalid client");
        }

        const category = await this.serviceCategoryRepository.findById(data.categoryId);
        if (!category) {
            throw new Error("Category not found");
        }

        const createdRequest = await this.serviceRequestRepository.create({
            ...data,
            status: "OPEN"
        });

        const eventPayload: ServiceRequestCreatedEvent = {
            event: "service.request.created",
            requestId: createdRequest.id,
            clientId: createdRequest.clientId,
            status: createdRequest.status,
            createdAt: createdRequest.createdAt.toISOString()
        };

        try {
            await this.serviceRequestCreatedProducer.publish(eventPayload);
        } catch (error) {
            console.error("[Producer] Falha ao publicar evento service.request.created:", error);
        }

        return createdRequest;
    }

    async getServiceRequestById(id: string): Promise<ServiceRequest | null> {
        return this.serviceRequestRepository.findById(id);
    }

    async getAllServiceRequests(): Promise<ServiceRequest[]> {
        return this.serviceRequestRepository.findAll();
    }

    async getOpenRequests(): Promise<ServiceRequest[]> {
        return this.serviceRequestRepository.findByStatus("OPEN");
    }

    async getClientRequests(clientId: string): Promise<ServiceRequest[]> {
        return this.serviceRequestRepository.findByClientId(clientId);
    }

    async getProviderRequests(providerId: string): Promise<ServiceRequest[]> {
        return this.serviceRequestRepository.findByProviderId(providerId);
    }

    async assignProvider(requestId: string, providerId: string): Promise<ServiceRequest> {
        const request = await this.serviceRequestRepository.findById(requestId);
        if (!request) {
            throw new Error("Request not found");
        }

        const provider = await this.userRepository.findById(providerId);
        if (!provider || provider.userType !== "PROVIDER") {
            throw new Error("Invalid provider");
        }

        return this.serviceRequestRepository.update(requestId, {
            providerId,
            status: "ASSIGNED"
        });
    }

    async completeRequest(requestId: string, finalPrice?: number): Promise<ServiceRequest> {
        const request = await this.serviceRequestRepository.findById(requestId);
        if (!request) {
            throw new Error("Request not found");
        }

        return this.serviceRequestRepository.update(requestId, {
            status: "COMPLETED",
            finalPrice: finalPrice || request.estimatedPrice
        });
    }

    async cancelRequest(requestId: string): Promise<ServiceRequest> {
        const request = await this.serviceRequestRepository.findById(requestId);
        if (!request) {
            throw new Error("Request not found");
        }

        return this.serviceRequestRepository.update(requestId, {
            status: "CANCELLED",
            providerId: null
        });
    }

    async updateServiceRequest(requestId: string, data: Partial<ServiceRequest>): Promise<ServiceRequest> {
        const request = await this.serviceRequestRepository.findById(requestId);
        if (!request) {
            throw new Error("Request not found");
        }

        return this.serviceRequestRepository.update(requestId, data);
    }

    async deleteServiceRequest(id: string): Promise<void> {
        const request = await this.serviceRequestRepository.findById(id);
        if (!request) {
            throw new Error("Request not found");
        }

        await this.serviceRequestRepository.delete(id);
    }
}
