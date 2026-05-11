import { Request, Response } from "express";
import { ReviewService } from "../services/ReviewService";

export class ReviewController {
    private reviewService: ReviewService;

    constructor() {
        this.reviewService = new ReviewService();
    }

    async createReview(req: Request, res: Response): Promise<void> {
        try {
            const { requestId, rating, comment } = req.body;

            const review = await this.reviewService.createReview({
                requestId,
                rating,
                comment
            });

            res.status(201).json({
                message: "Review created successfully",
                data: review
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async getReviewById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const review = await this.reviewService.getReviewById(id);

            if (!review) {
                res.status(404).json({
                    error: "Review not found"
                });
                return;
            }

            res.status(200).json({
                data: review
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async getAllReviews(req: Request, res: Response): Promise<void> {
        try {
            const reviews = await this.reviewService.getAllReviews();

            res.status(200).json({
                data: reviews,
                count: reviews.length
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async updateReview(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const review = await this.reviewService.updateReview(id, updateData);

            res.status(200).json({
                message: "Review updated successfully",
                data: review
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async deleteReview(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            await this.reviewService.deleteReview(id);

            res.status(200).json({
                message: "Review deleted successfully"
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}
