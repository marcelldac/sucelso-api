import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("[prisma-client] new prisma instance created");

export default prisma;
