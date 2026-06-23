import { consumeMessages, SERVICE_REQUEST_CREATED_QUEUE } from "../queues/rabbitmq";
import { ServiceRequestCreatedEvent } from "../types/events";
import { ServiceRequestService } from "../services/ServiceRequestService";
import { sleep } from "../utils/async";

const serviceRequestService = new ServiceRequestService();

export async function startServiceRequestCreatedConsumer(): Promise<void> {
    await consumeMessages(
        SERVICE_REQUEST_CREATED_QUEUE,
        async (rawEvent: unknown): Promise<void> => {
            const event = rawEvent as ServiceRequestCreatedEvent;

            console.log("[Consumer] Evento recebido", event);
            console.log("[Worker] Processando notificacao...");

            await sleep(3000);

            const updatedRequest = await serviceRequestService.markRequestAsOpen(event.requestId);

            console.log(
                `[Worker] Notificacao enviada para a solicitacao ${event.requestId} do cliente ${event.clientId}`
            );
            console.log(
                `[Worker] Status atualizado para ${updatedRequest.status} (assincrono)`
            );
        }
    );
}
