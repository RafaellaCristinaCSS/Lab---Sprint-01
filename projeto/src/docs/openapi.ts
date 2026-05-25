export const openApiSpec = {
    openapi: "3.0.3",
    info: {
        title: "Home Service API",
        version: "1.0.0",
        description: "API REST para gerenciamento de servicos residenciais"
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor local"
        }
    ],
    tags: [
        { name: "Health" },
        { name: "Users" },
        { name: "Requests" },
        { name: "Categories" },
        { name: "Reviews" }
    ],
    components: {
        schemas: {
            ErrorResponse: {
                type: "object",
                properties: {
                    error: { type: "string", example: "Validation error" },
                    details: {
                        type: "array",
                        items: { type: "string" },
                        example: ["\"email\" must be a valid email"]
                    },
                    timestamp: { type: "string", format: "date-time" }
                }
            },
            User: {
                type: "object",
                properties: {
                    id: { type: "string", format: "uuid" },
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    phone: { type: "string" },
                    userType: { type: "string", enum: ["CLIENT", "PROVIDER"] },
                    address: { type: "string" },
                    city: { type: "string" },
                    state: { type: "string", minLength: 2, maxLength: 2 },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" }
                }
            },
            CreateUserInput: {
                type: "object",
                required: ["name", "email", "phone", "userType", "address", "city", "state"],
                properties: {
                    name: { type: "string", minLength: 3, maxLength: 100 },
                    email: { type: "string", format: "email" },
                    phone: { type: "string", minLength: 10 },
                    userType: { type: "string", enum: ["CLIENT", "PROVIDER"] },
                    address: { type: "string" },
                    city: { type: "string" },
                    state: { type: "string", minLength: 2, maxLength: 2 }
                }
            },
            UpdateUserInput: {
                type: "object",
                properties: {
                    name: { type: "string", minLength: 3, maxLength: 100 },
                    email: { type: "string", format: "email" },
                    phone: { type: "string", minLength: 10 },
                    userType: { type: "string", enum: ["CLIENT", "PROVIDER"] },
                    address: { type: "string" },
                    city: { type: "string" },
                    state: { type: "string", minLength: 2, maxLength: 2 }
                }
            },
            ServiceCategory: {
                type: "object",
                properties: {
                    id: { type: "string", format: "uuid" },
                    name: { type: "string" },
                    description: { type: "string" },
                    createdAt: { type: "string", format: "date-time" }
                }
            },
            CreateCategoryInput: {
                type: "object",
                required: ["name", "description"],
                properties: {
                    name: { type: "string", minLength: 3, maxLength: 100 },
                    description: { type: "string", minLength: 10 }
                }
            },
            UpdateCategoryInput: {
                type: "object",
                properties: {
                    name: { type: "string", minLength: 3, maxLength: 100 },
                    description: { type: "string", minLength: 10 }
                }
            },
            ServiceRequest: {
                type: "object",
                properties: {
                    id: { type: "string", format: "uuid" },
                    clientId: { type: "string", format: "uuid" },
                    providerId: { type: ["string", "null"], format: "uuid" },
                    categoryId: { type: "string", format: "uuid" },
                    title: { type: "string" },
                    description: { type: "string" },
                    status: {
                        type: "string",
                        enum: ["OPEN", "ASSIGNED", "COMPLETED", "CANCELLED"]
                    },
                    scheduledDate: { type: "string", format: "date-time" },
                    estimatedPrice: { type: ["number", "null"] },
                    finalPrice: { type: ["number", "null"] },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" }
                }
            },
            CreateServiceRequestInput: {
                type: "object",
                required: ["clientId", "categoryId", "title", "description", "scheduledDate"],
                properties: {
                    clientId: { type: "string", format: "uuid" },
                    categoryId: { type: "string", format: "uuid" },
                    title: { type: "string", minLength: 5, maxLength: 100 },
                    description: { type: "string", minLength: 10 },
                    scheduledDate: { type: "string", format: "date-time" },
                    estimatedPrice: { type: "number", minimum: 0 }
                }
            },
            ServiceRequestCreatedEvent: {
                type: "object",
                properties: {
                    event: { type: "string", example: "service.request.created" },
                    requestId: { type: "string", format: "uuid" },
                    clientId: { type: "string", format: "uuid" },
                    status: { type: "string", example: "OPEN" },
                    createdAt: { type: "string", format: "date-time" }
                }
            },
            AssignProviderInput: {
                type: "object",
                required: ["providerId"],
                properties: {
                    providerId: { type: "string", format: "uuid" }
                }
            },
            CompleteRequestInput: {
                type: "object",
                properties: {
                    finalPrice: { type: "number", minimum: 0 }
                }
            },
            Review: {
                type: "object",
                properties: {
                    id: { type: "string", format: "uuid" },
                    requestId: { type: "string", format: "uuid" },
                    rating: { type: "integer", minimum: 1, maximum: 5 },
                    comment: { type: "string" },
                    createdAt: { type: "string", format: "date-time" }
                }
            },
            CreateReviewInput: {
                type: "object",
                required: ["requestId", "rating", "comment"],
                properties: {
                    requestId: { type: "string", format: "uuid" },
                    rating: { type: "integer", minimum: 1, maximum: 5 },
                    comment: { type: "string", minLength: 5 }
                }
            },
            UpdateReviewInput: {
                type: "object",
                properties: {
                    rating: { type: "integer", minimum: 1, maximum: 5 },
                    comment: { type: "string", minLength: 5 }
                }
            },
            MessageResponse: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            },
            DataResponse: {
                type: "object",
                properties: {
                    data: {}
                }
            },
            ListResponse: {
                type: "object",
                properties: {
                    data: { type: "array", items: {} },
                    count: { type: "integer" }
                }
            }
        }
    },
    paths: {
        "/api/health": {
            get: {
                tags: ["Health"],
                summary: "Verifica se a API esta saudavel",
                responses: {
                    "200": {
                        description: "API saudavel"
                    }
                }
            }
        },
        "/api/users": {
            post: {
                tags: ["Users"],
                summary: "Cria um usuario",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CreateUserInput" }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Usuario criado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string" },
                                        data: { $ref: "#/components/schemas/User" }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Erro de validacao ou regra de negocio",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ErrorResponse" }
                            }
                        }
                    }
                }
            },
            get: {
                tags: ["Users"],
                summary: "Lista todos os usuarios",
                responses: {
                    "200": {
                        description: "Lista de usuarios",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/User" }
                                        },
                                        count: { type: "integer" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/providers": {
            get: {
                tags: ["Users"],
                summary: "Lista usuarios prestadores",
                responses: {
                    "200": {
                        description: "Lista de prestadores",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/User" }
                                        },
                                        count: { type: "integer" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/{id}": {
            get: {
                tags: ["Users"],
                summary: "Busca usuario por id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Usuario encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        data: { $ref: "#/components/schemas/User" }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        description: "Usuario nao encontrado"
                    }
                }
            },
            put: {
                tags: ["Users"],
                summary: "Atualiza usuario",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UpdateUserInput" }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Usuario atualizado"
                    },
                    "400": {
                        description: "Erro ao atualizar usuario"
                    }
                }
            },
            delete: {
                tags: ["Users"],
                summary: "Remove usuario",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Usuario removido"
                    },
                    "400": {
                        description: "Erro ao remover usuario"
                    }
                }
            }
        },
        "/api/categories": {
            post: {
                tags: ["Categories"],
                summary: "Cria categoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CreateCategoryInput" }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Categoria criada"
                    },
                    "400": {
                        description: "Erro de validacao"
                    }
                }
            },
            get: {
                tags: ["Categories"],
                summary: "Lista categorias",
                responses: {
                    "200": {
                        description: "Lista de categorias"
                    }
                }
            }
        },
        "/api/categories/{id}": {
            get: {
                tags: ["Categories"],
                summary: "Busca categoria por id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Categoria encontrada"
                    },
                    "404": {
                        description: "Categoria nao encontrada"
                    }
                }
            },
            put: {
                tags: ["Categories"],
                summary: "Atualiza categoria",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UpdateCategoryInput" }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Categoria atualizada"
                    }
                }
            },
            delete: {
                tags: ["Categories"],
                summary: "Remove categoria",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Categoria removida"
                    }
                }
            }
        },
        "/api/requests": {
            post: {
                tags: ["Requests"],
                summary: "Cria solicitacao de servico e publica evento assincrono no RabbitMQ",
                description:
                    "Fluxo sincrono: valida e salva no banco, retornando 201. Fluxo assincrono: publica o evento service.request.created para processamento em worker desacoplado.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CreateServiceRequestInput" },
                            example: {
                                clientId: "0f3d6d95-8f6f-44db-b2af-6be5f1fceabc",
                                categoryId: "86f8e8ea-4b9e-4f8a-a5c0-7b2b0ad4efab",
                                title: "Troca de tomada",
                                description: "Preciso trocar uma tomada que parou de funcionar no quarto",
                                scheduledDate: "2026-05-20T14:00:00.000Z",
                                estimatedPrice: 120
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Solicitacao criada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string", example: "Solicitacao criada com sucesso" },
                                        data: { $ref: "#/components/schemas/ServiceRequest" }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Erro de validacao ou regra de negocio"
                    }
                }
            },
            get: {
                tags: ["Requests"],
                summary: "Lista todas as solicitacoes",
                responses: {
                    "200": {
                        description: "Lista de solicitacoes"
                    }
                }
            }
        },
        "/service-requests": {
            post: {
                tags: ["Requests"],
                summary: "Alias de POST /api/requests para criacao de solicitacao",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CreateServiceRequestInput" }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Solicitacao criada com sucesso"
                    },
                    "400": {
                        description: "Erro de validacao ou regra de negocio"
                    }
                }
            }
        },
        "/api/requests/open": {
            get: {
                tags: ["Requests"],
                summary: "Lista solicitacoes abertas",
                responses: {
                    "200": {
                        description: "Lista de solicitacoes abertas"
                    }
                }
            }
        },
        "/api/requests/client/{clientId}": {
            get: {
                tags: ["Requests"],
                summary: "Lista solicitacoes de um cliente",
                parameters: [
                    {
                        name: "clientId",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Lista de solicitacoes do cliente"
                    }
                }
            }
        },
        "/api/requests/{id}": {
            get: {
                tags: ["Requests"],
                summary: "Busca solicitacao por id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Solicitacao encontrada"
                    },
                    "404": {
                        description: "Solicitacao nao encontrada"
                    }
                }
            },
            delete: {
                tags: ["Requests"],
                summary: "Remove solicitacao",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Solicitacao removida"
                    },
                    "400": {
                        description: "Erro ao remover solicitacao"
                    }
                }
            }
        },
        "/api/requests/{requestId}/assign": {
            put: {
                tags: ["Requests"],
                summary: "Atribui prestador a solicitacao",
                parameters: [
                    {
                        name: "requestId",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AssignProviderInput" }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Prestador atribuido"
                    },
                    "400": {
                        description: "Erro ao atribuir prestador"
                    }
                }
            }
        },
        "/api/requests/{requestId}/complete": {
            put: {
                tags: ["Requests"],
                summary: "Conclui solicitacao",
                parameters: [
                    {
                        name: "requestId",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                requestBody: {
                    required: false,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CompleteRequestInput" }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Solicitacao concluida"
                    },
                    "400": {
                        description: "Erro ao concluir solicitacao"
                    }
                }
            }
        },
        "/api/requests/{requestId}/cancel": {
            put: {
                tags: ["Requests"],
                summary: "Cancela solicitacao",
                parameters: [
                    {
                        name: "requestId",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Solicitacao cancelada"
                    },
                    "400": {
                        description: "Erro ao cancelar solicitacao"
                    }
                }
            }
        },
        "/api/reviews": {
            post: {
                tags: ["Reviews"],
                summary: "Cria avaliacao",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CreateReviewInput" }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Avaliacao criada"
                    },
                    "400": {
                        description: "Erro de validacao ou regra de negocio"
                    }
                }
            },
            get: {
                tags: ["Reviews"],
                summary: "Lista avaliacoes",
                responses: {
                    "200": {
                        description: "Lista de avaliacoes"
                    }
                }
            }
        },
        "/api/reviews/{id}": {
            get: {
                tags: ["Reviews"],
                summary: "Busca avaliacao por id",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Avaliacao encontrada"
                    },
                    "404": {
                        description: "Avaliacao nao encontrada"
                    }
                }
            },
            put: {
                tags: ["Reviews"],
                summary: "Atualiza avaliacao",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UpdateReviewInput" }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Avaliacao atualizada"
                    },
                    "400": {
                        description: "Erro ao atualizar avaliacao"
                    }
                }
            },
            delete: {
                tags: ["Reviews"],
                summary: "Remove avaliacao",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string", format: "uuid" }
                    }
                ],
                responses: {
                    "200": {
                        description: "Avaliacao removida"
                    },
                    "400": {
                        description: "Erro ao remover avaliacao"
                    }
                }
            }
        }
    }
};
