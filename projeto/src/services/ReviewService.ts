import { ReviewRepository } from "../repositories/ReviewRepository";
import { ServiceRequestRepository } from "../repositories/ServiceRequestRepository";
import { Review } from "../entities";

export class ReviewService {
    private reviewRepository: ReviewRepository;
    private serviceRequestRepository: ServiceRequestRepository;

    constructor() {
        this.reviewRepository = new ReviewRepository();
        this.serviceRequestRepository = new ServiceRequestRepository();
    }

    async createReview(data: {
        requestId: string;
        rating: number;
        comment: string;
    }): Promise<Review> {
        if (data.rating < 1 || data.rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }

        const request = await this.serviceRequestRepository.findById(data.requestId);
        if (!request) {
            throw new Error("Request not found");
        }

        const existingReview = await this.reviewRepository.findByRequestId(data.requestId);
        if (existingReview) {
            throw new Error("Review already exists for this request");
        }

        return this.reviewRepository.create(data);
    }

    async getReviewById(id: string): Promise<Review | null> {
        return this.reviewRepository.findById(id);
    }

    async getAllReviews(): Promise<Review[]> {
        return this.reviewRepository.findAll();
    }

    async getReviewByRequestId(requestId: string): Promise<Review | null> {
        return this.reviewRepository.findByRequestId(requestId);
    }

    async updateReview(id: string, data: Partial<Review>): Promise<Review> {
        const review = await this.reviewRepository.findById(id);
        if (!review) {
            throw new Error("Review not found");
        }

        if (data.rating && (data.rating < 1 || data.rating > 5)) {
            throw new Error("Rating must be between 1 and 5");
        }

        return this.reviewRepository.update(id, data);
    }

    async deleteReview(id: string): Promise<void> {
        const review = await this.reviewRepository.findById(id);
        if (!review) {
            throw new Error("Review not found");
        }

        await this.reviewRepository.delete(id);
    }
}
