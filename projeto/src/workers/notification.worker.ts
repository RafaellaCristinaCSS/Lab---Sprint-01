import dotenv from "dotenv";
import { startServiceRequestCreatedConsumer } from "../consumers/serviceRequestCreated.consumer";

dotenv.config();

async function bootstrapWorker(): Promise<void> {
    try {
        await startServiceRequestCreatedConsumer();
        console.log("[Worker] Notification worker online");
    } catch (error) {
        console.error("[Worker] Failed to start notification worker:", error);
        process.exit(1);
    }
}

bootstrapWorker();
