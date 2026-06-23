import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import { openApiSpec } from "./docs/openapi";
import userRoutes from "./routes/userRoutes";
import serviceRequestRoutes from "./routes/serviceRequestRoutes";
import serviceCategoryRoutes from "./routes/serviceCategoryRoutes";
import reviewRoutes from "./routes/reviewRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
            return;
        }

        const allowed =
            /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

        callback(null, allowed || process.env.NODE_ENV === "development");
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(requestLogger);

app.use("/api/users", userRoutes);
app.use("/api/requests", serviceRequestRoutes);
app.use("/service-requests", serviceRequestRoutes);
app.use("/api/categories", serviceCategoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.get("/api/docs.json", (req, res) => {
    res.status(200).json(openApiSpec);
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date()
    });
});

app.use(errorHandler);

app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
