import prisma from "../database/client";
import { User } from "../entities";

export class UserRepository {
    async create(data: any): Promise<User> {
        return prisma.user.create({ data });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async findByType(userType: string): Promise<User[]> {
        return prisma.user.findMany({ where: { userType } });
    }

    async update(id: string, data: any): Promise<User> {
        return prisma.user.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }
}
