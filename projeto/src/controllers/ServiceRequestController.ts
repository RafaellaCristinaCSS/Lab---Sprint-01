import { Request, Response } from "express";
import { ServiceRequestService } from "../services/ServiceRequestService";

export class ServiceRequestController {
    private serviceRequestService: ServiceRequestService;

    constructor() {
        this.serviceRequestService = new ServiceRequestService();
    }

    async createServiceRequest(req: Request, res: Response): Promise<void> {
        try {
            const {
                clientId,
                categoryId,
                title,
                description,
                scheduledDate,
                estimatedPrice
            } = req.body;

            const serviceRequest = await this.serviceRequestService.createServiceRequest({
                clientId,
                categoryId,
                title,
                description,
                scheduledDate: new Date(scheduledDate),
                estimatedPrice
            });

            res.status(201).json({
                message: "Service request created successfully",
                data: serviceRequest
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async getServiceRequestById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const serviceRequest = await this.serviceRequestService.getServiceRequestById(id);

            if (!serviceRequest) {
                res.status(404).json({
                    error: "Service request not found"
                });
                return;
            }

            res.status(200).json({
                data: serviceRequest
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async getAllServiceRequests(req: Request, res: Response): Promise<void> {
        try {
            const requests = await this.serviceRequestService.getAllServiceRequests();

            res.status(200).json({
                data: requests,
                count: requests.length
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async getOpenRequests(req: Request, res: Response): Promise<void> {
        try {
            const requests = await this.serviceRequestService.getOpenRequests();

            res.status(200).json({
                data: requests,
                count: requests.length
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async getClientRequests(req: Request, res: Response): Promise<void> {
        try {
            const { clientId } = req.params;
            const requests = await this.serviceRequestService.getClientRequests(clientId);

            res.status(200).json({
                data: requests,
                count: requests.length
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async assignProvider(req: Request, res: Response): Promise<void> {
        try {
            const { requestId } = req.params;
            const { providerId } = req.body;

            const updatedRequest = await this.serviceRequestService.assignProvider(
                requestId,
                providerId
            );

            res.status(200).json({
                message: "Provider assigned successfully",
                data: updatedRequest
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async completeRequest(req: Request, res: Response): Promise<void> {
        try {
            const { requestId } = req.params;
            const { finalPrice } = req.body;

            const updatedRequest = await this.serviceRequestService.completeRequest(
                requestId,
                finalPrice
            );

            res.status(200).json({
                message: "Request completed successfully",
                data: updatedRequest
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async cancelRequest(req: Request, res: Response): Promise<void> {
        try {
            const { requestId } = req.params;

            const updatedRequest = await this.serviceRequestService.cancelRequest(requestId);

            res.status(200).json({
                message: "Request cancelled successfully",
                data: updatedRequest
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async deleteServiceRequest(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            await this.serviceRequestService.deleteServiceRequest(id);

            res.status(200).json({
                message: "Service request deleted successfully"
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}
