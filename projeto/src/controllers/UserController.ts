import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, phone, userType, address, city, state } = req.body;

            const user = await this.userService.createUser({
                name,
                email,
                phone,
                userType,
                address,
                city,
                state
            });

            res.status(201).json({
                message: "User created successfully",
                data: user
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({
                    error: "User not found"
                });
                return;
            }

            res.status(200).json({
                data: user
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();

            res.status(200).json({
                data: users,
                count: users.length
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async getProviders(req: Request, res: Response): Promise<void> {
        try {
            const providers = await this.userService.getProviders();

            res.status(200).json({
                data: providers,
                count: providers.length
            });
        } catch (error: any) {
            res.status(500).json({
                error: error.message
            });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const user = await this.userService.updateUser(id, updateData);

            res.status(200).json({
                message: "User updated successfully",
                data: user
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            await this.userService.deleteUser(id);

            res.status(200).json({
                message: "User deleted successfully"
            });
        } catch (error: any) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}
