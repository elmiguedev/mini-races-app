import { defineEventHandler } from "h3"
import prisma from "../../../lib/prisma"

export default defineEventHandler(async (event) => {

  const users = await prisma.user.findMany();
  const user = await prisma.user.findFirst({
    where: {
      id: 1
    }
  });
  return {
    message: 'test',
    users,
    user
  }
})