import { Router } from "express";
import { ServiceRequestController } from "../controllers/ServiceRequestController";
import { validateRequest } from "../validations/validateRequest";
import {
    createServiceRequestSchema,
    assignProviderSchema,
    startRequestSchema,
    completeRequestSchema
} from "../validations/schemas";

const router = Router();
const serviceRequestController = new ServiceRequestController();

router.post("/", validateRequest(createServiceRequestSchema), (req, res) =>
    serviceRequestController.createServiceRequest(req, res)
);
router.get("/", (req, res) => serviceRequestController.getAllServiceRequests(req, res));
router.get("/open", (req, res) => serviceRequestController.getOpenRequests(req, res));
router.get("/client/:clientId", (req, res) => serviceRequestController.getClientRequests(req, res));
router.get("/provider/:providerId", (req, res) => serviceRequestController.getProviderRequests(req, res));
router.get("/:id", (req, res) => serviceRequestController.getServiceRequestById(req, res));
router.put("/:requestId/assign", validateRequest(assignProviderSchema), (req, res) =>
    serviceRequestController.assignProvider(req, res)
);
router.put("/:requestId/start", validateRequest(startRequestSchema), (req, res) =>
    serviceRequestController.startRequest(req, res)
);
router.put("/:requestId/complete", validateRequest(completeRequestSchema), (req, res) =>
    serviceRequestController.completeRequest(req, res)
);
router.put("/:requestId/cancel", (req, res) => serviceRequestController.cancelRequest(req, res));
router.delete("/:id", (req, res) => serviceRequestController.deleteServiceRequest(req, res));

export default router;
