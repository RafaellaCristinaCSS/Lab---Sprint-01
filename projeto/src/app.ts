import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoutes";
import serviceRequestRoutes from "./routes/serviceRequestRoutes";
import serviceCategoryRoutes from "./routes/serviceCategoryRoutes";
import reviewRoutes from "./routes/reviewRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/users", userRoutes);
app.use("/api/requests", serviceRequestRoutes);
app.use("/api/categories", serviceCategoryRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date()
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
