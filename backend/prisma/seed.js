require("dotenv").config();

const bcrypt = require("bcrypt");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const employeePassword = await bcrypt.hash("employee123", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Employee User",
        email: "employee@example.com",
        password: employeePassword,
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