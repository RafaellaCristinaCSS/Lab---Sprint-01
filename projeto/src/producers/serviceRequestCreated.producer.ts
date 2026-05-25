import { SERVICE_REQUEST_CREATED_QUEUE, publishMessage } from "../queues/rabbitmq";
import { ServiceRequestCreatedEvent } from "../types/events";

export class ServiceRequestCreatedProducer {
    async publish(eventPayload: ServiceRequestCreatedEvent): Promise<void> {
        await publishMessage(SERVICE_REQUEST_CREATED_QUEUE, eventPayload);
        console.log("[Producer] Evento publicado", eventPayload);
    }
}
