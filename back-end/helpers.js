import prisma from "./services/Prisma.js"


export async function getUsers(filter = ""){
    const allUsers = await prisma.user.findMany()
    return allUsers
}