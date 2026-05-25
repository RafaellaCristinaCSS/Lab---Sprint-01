import amqp, { Channel, ChannelModel, ConsumeMessage } from "amqplib";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

export const SERVICE_REQUEST_CREATED_QUEUE = "service.request.created";

async function createChannel(): Promise<Channel> {
    if (channel) {
        return channel;
    }

    if (!connection) {
        const createdConnection = await amqp.connect(RABBITMQ_URL);
        connection = createdConnection;

        createdConnection.on("error", (error: Error) => {
            console.error("[RabbitMQ] Connection error:", error.message);
        });

        createdConnection.on("close", () => {
            channel = null;
            connection = null;
            console.warn("[RabbitMQ] Connection closed");
        });
    }

    const createdChannel = await connection.createChannel();
    channel = createdChannel;
    return createdChannel;
}

export async function assertQueue(queueName: string): Promise<void> {
    const currentChannel = await createChannel();
    await currentChannel.assertQueue(queueName, { durable: true });
}

export async function publishMessage(queueName: string, payload: unknown): Promise<void> {
    const currentChannel = await createChannel();

    await currentChannel.assertQueue(queueName, { durable: true });
    const serializedPayload = Buffer.from(JSON.stringify(payload));

    currentChannel.sendToQueue(queueName, serializedPayload, {
        persistent: true
    });
}

export async function consumeMessages(
    queueName: string,
    handler: (message: unknown) => Promise<void>
): Promise<void> {
    const currentChannel = await createChannel();

    await currentChannel.assertQueue(queueName, { durable: true });
    await currentChannel.prefetch(1);

    await currentChannel.consume(queueName, async (rawMessage: ConsumeMessage | null) => {
        if (!rawMessage) {
            return;
        }

        try {
            const parsedMessage = JSON.parse(rawMessage.content.toString());
            await handler(parsedMessage);
            currentChannel.ack(rawMessage);
        } catch (error) {
            console.error("[RabbitMQ] Error while consuming message:", error);
            currentChannel.nack(rawMessage, false, false);
        }
    });
}

export async function closeRabbitMqConnection(): Promise<void> {
    if (channel) {
        await channel.close();
        channel = null;
    }

    if (connection) {
        await connection.close();
        connection = null;
    }
}
