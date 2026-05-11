export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    userType: string;
    address: string;
    city: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ServiceCategory {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}

export interface ServiceRequest {
    id: string;
    clientId: string;
    providerId: string | null;
    categoryId: string;
    title: string;
    description: string;
    status: string;
    scheduledDate: Date;
    estimatedPrice: number | null;
    finalPrice: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: string;
    requestId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
