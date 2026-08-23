require("dotenv").config();

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Employee User",
        email: "employee@example.com",
        password: "employee123",
        role: "employee",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { name: "Company Introduction" },
      { name: "Policies" },
      { name: "Training" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });