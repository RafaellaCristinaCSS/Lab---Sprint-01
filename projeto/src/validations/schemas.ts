import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().required().min(3).max(100),
    email: Joi.string().email().required(),
    phone: Joi.string().required().min(10),
    userType: Joi.string().valid("CLIENT", "PROVIDER").required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required().length(2)
});

export const createServiceRequestSchema = Joi.object({
    clientId: Joi.string().uuid().required(),
    categoryId: Joi.string().uuid().required(),
    title: Joi.string().required().min(5).max(100),
    description: Joi.string().required().min(10),
    scheduledDate: Joi.date().required().iso(),
    estimatedPrice: Joi.number().positive()
});

export const assignProviderSchema = Joi.object({
    providerId: Joi.string().uuid().required()
});

export const completeRequestSchema = Joi.object({
    finalPrice: Joi.number().positive()
});

export const createReviewSchema = Joi.object({
    requestId: Joi.string().uuid().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required().min(5)
});

export const createCategorySchema = Joi.object({
    name: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10)
});
