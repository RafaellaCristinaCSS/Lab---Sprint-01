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
            clientName: client.name,
            status: "PENDING"
        });

        const eventPayload: ServiceRequestCreatedEvent = {
            event: "service.request.created",
            requestId: createdRequest.id,
            clientId: createdRequest.clientId,
            status: "PENDING",
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

        if (request.status !== "OPEN") {
            throw new Error("Request is not available for assignment");
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

    async startRequest(requestId: string, providerId: string): Promise<ServiceRequest> {
        const request = await this.serviceRequestRepository.findById(requestId);
        if (!request) {
            throw new Error("Request not found");
        }

        if (request.status !== "ASSIGNED") {
            throw new Error("Request must be assigned before starting");
        }

        if (request.providerId !== providerId) {
            throw new Error("Only the assigned provider can start this request");
        }

        return this.serviceRequestRepository.update(requestId, {
            status: "IN_PROGRESS"
        });
    }

    async completeRequest(requestId: string, finalPrice?: number, providerId?: string): Promise<ServiceRequest> {
        const request = await this.serviceRequestRepository.findById(requestId);
        if (!request) {
            throw new Error("Request not found");
        }

        if (!["ASSIGNED", "IN_PROGRESS"].includes(request.status)) {
            throw new Error("Request cannot be completed in current status");
        }

        if (providerId && request.providerId !== providerId) {
            throw new Error("Only the assigned provider can complete this request");
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

        if (["COMPLETED", "CANCELLED"].includes(request.status)) {
            throw new Error("Request cannot be cancelled in current status");
        }

        return this.serviceRequestRepository.update(requestId, {
            status: "CANCELLED",
            providerId: null
        });
    }

    async markRequestAsOpen(requestId: string): Promise<ServiceRequest> {
        const request = await this.serviceRequestRepository.findById(requestId);
        if (!request) {
            throw new Error("Request not found");
        }

        if (request.status !== "PENDING") {
            return request;
        }

        return this.serviceRequestRepository.update(requestId, {
            status: "OPEN"
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
