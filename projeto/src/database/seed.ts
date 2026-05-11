import prisma from "./client";

async function seed() {
    await prisma.serviceCategory.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.serviceRequest.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.serviceCategory.createMany({
        data: [
            {
                name: "Encanamento",
                description: "Serviços de encanamento residencial"
            },
            {
                name: "Eletricidade",
                description: "Serviços de instalação e manutenção elétrica"
            },
            {
                name: "Limpeza",
                description: "Serviços de limpeza e higienização"
            },
            {
                name: "Pintura",
                description: "Serviços de pintura e acabamento"
            },
            {
                name: "Marcenaria",
                description: "Serviços de carpintaria e marcenaria"
            }
        ]
    });

    const plumbingCategory = await prisma.serviceCategory.findUnique({
        where: { name: "Encanamento" }
    });

    if (!plumbingCategory) {
        throw new Error("Seed category not found");
    }

    const client = await prisma.user.create({
        data: {
            name: "João Silva",
            email: "joao@example.com",
            phone: "11999999999",
            userType: "CLIENT",
            address: "Rua A, 123",
            city: "São Paulo",
            state: "SP"
        }
    });

    const provider = await prisma.user.create({
        data: {
            name: "Carlos Santos",
            email: "carlos@example.com",
            phone: "11988888888",
            userType: "PROVIDER",
            address: "Rua B, 456",
            city: "São Paulo",
            state: "SP"
        }
    });

    const request = await prisma.serviceRequest.create({
        data: {
            clientId: client.id,
            providerId: provider.id,
            categoryId: plumbingCategory.id,
            title: "Conserto de vazamento",
            description: "Vazamento na cozinha",
            status: "COMPLETED",
            scheduledDate: new Date(),
            estimatedPrice: 200,
            finalPrice: 220
        }
    });

    await prisma.review.create({
        data: {
            requestId: request.id,
            rating: 5,
            comment: "Excelente trabalho, muito satisfeito"
        }
    });

    console.log("Database seeded successfully");
}

seed()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
