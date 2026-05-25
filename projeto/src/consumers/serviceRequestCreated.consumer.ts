import { consumeMessages, SERVICE_REQUEST_CREATED_QUEUE } from "../queues/rabbitmq";
import { ServiceRequestCreatedEvent } from "../types/events";

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export async function startServiceRequestCreatedConsumer(): Promise<void> {
    await consumeMessages(
        SERVICE_REQUEST_CREATED_QUEUE,
        async (rawEvent: unknown): Promise<void> => {
            const event = rawEvent as ServiceRequestCreatedEvent;

            console.log("[Consumer] Evento recebido", event);
            console.log("[Worker] Processando notificacao...");

            await sleep(3000);

            console.log(
                `[Worker] Notificacao enviada para a solicitacao ${event.requestId} do cliente ${event.clientId}`
            );
        }
    );
}
