#!/usr/bin/env node

const API = process.env.API_URL || "http://localhost:3000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error || `Request failed: ${response.status}`);
  }

  return body;
}

async function seed() {
  console.log("Seeding demo data...");

  const categories = [
    { name: "Eletricidade", description: "Servicos eletricos residenciais" },
    { name: "Encanamento", description: "Reparos hidraulicos e vazamentos" },
    { name: "Limpeza", description: "Limpeza residencial e pos-obra" }
  ];

  const createdCategories = [];
  for (const category of categories) {
    try {
      const result = await request("/categories", {
        method: "POST",
        body: JSON.stringify(category)
      });
      createdCategories.push(result.data);
      console.log(`Category created: ${result.data.name}`);
    } catch (error) {
      console.log(`Category skipped (${category.name}): ${error.message}`);
      const existing = await request("/categories");
      const found = existing.data.find((item) => item.name === category.name);
      if (found) createdCategories.push(found);
    }
  }

  const users = [
    {
      name: "Maria Cliente",
      email: "maria.cliente@example.com",
      phone: "11999990001",
      userType: "CLIENT",
      address: "Rua A, 100",
      city: "Sao Paulo",
      state: "SP"
    },
    {
      name: "Joao Cliente",
      email: "joao.cliente@example.com",
      phone: "11999990002",
      userType: "CLIENT",
      address: "Rua B, 200",
      city: "Sao Paulo",
      state: "SP"
    },
    {
      name: "Carlos Fornecedor",
      email: "carlos.provider@example.com",
      phone: "11988880001",
      userType: "PROVIDER",
      address: "Av. C, 300",
      city: "Sao Paulo",
      state: "SP"
    },
    {
      name: "Ana Fornecedora",
      email: "ana.provider@example.com",
      phone: "11988880002",
      userType: "PROVIDER",
      address: "Av. D, 400",
      city: "Sao Paulo",
      state: "SP"
    }
  ];

  for (const user of users) {
    try {
      const result = await request("/users", {
        method: "POST",
        body: JSON.stringify(user)
      });
      console.log(`User created: ${result.data.name} (${result.data.userType})`);
    } catch (error) {
      console.log(`User skipped (${user.email}): ${error.message}`);
    }
  }

  console.log("Seed finished.");
  console.log(`Categories available: ${createdCategories.length}`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
