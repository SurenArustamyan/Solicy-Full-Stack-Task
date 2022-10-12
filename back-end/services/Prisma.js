import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;



prisma.user.createMany({
    data: Array.from({ length: 8 }).map((_, i) => ({
        name: `Account ${i+=1}`,
        owner: `User ${i}`,
    }))
  }).then(e => console.log(e))