export interface ServiceRequestCreatedEvent {
    event: "service.request.created";
    requestId: string;
    clientId: string;
    status: string;
    createdAt: string;
}
