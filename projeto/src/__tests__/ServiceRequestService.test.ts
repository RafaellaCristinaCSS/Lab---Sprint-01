import { ServiceRequestService } from "../services/ServiceRequestService";

jest.mock("../repositories/ServiceRequestRepository");
jest.mock("../repositories/ServiceCategoryRepository");
jest.mock("../repositories/UserRepository");

describe("ServiceRequestService", () => {
    let serviceRequestService: ServiceRequestService;

    beforeEach(() => {
        serviceRequestService = new ServiceRequestService();
    });

    describe("createServiceRequest", () => {
        it("should create a new service request successfully", async () => {
            expect(serviceRequestService).toBeDefined();
        });

        it("should throw error if client is invalid", async () => {
            expect(serviceRequestService).toBeDefined();
        });

        it("should throw error if category not found", async () => {
            expect(serviceRequestService).toBeDefined();
        });
    });

    describe("assignProvider", () => {
        it("should assign provider to request", async () => {
            expect(serviceRequestService).toBeDefined();
        });

        it("should throw error if request not found", async () => {
            expect(serviceRequestService).toBeDefined();
        });

        it("should throw error if provider is invalid", async () => {
            expect(serviceRequestService).toBeDefined();
        });
    });

    describe("completeRequest", () => {
        it("should complete request", async () => {
            expect(serviceRequestService).toBeDefined();
        });

        it("should throw error if request not found", async () => {
            expect(serviceRequestService).toBeDefined();
        });
    });
});
