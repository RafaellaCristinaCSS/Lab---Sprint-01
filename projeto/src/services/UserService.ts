import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data: {
        name: string;
        email: string;
        phone: string;
        userType: "CLIENT" | "PROVIDER";
        address: string;
        city: string;
        state: string;
    }): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        return this.userRepository.create(data);
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getProviders(): Promise<User[]> {
        return this.userRepository.findByType("PROVIDER");
    }

    async getClients(): Promise<User[]> {
        return this.userRepository.findByType("CLIENT");
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        return this.userRepository.update(id, data);
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        await this.userRepository.delete(id);
    }
}
