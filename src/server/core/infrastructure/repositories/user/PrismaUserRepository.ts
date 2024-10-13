import prisma from "../../../../../../lib/prisma";
import { User } from "../../../domain/user/User";
import { UserRepository } from "./UserRepository";

export class PrimsaUserRepository implements UserRepository {
  public async create(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password!
      }
    });
    return newUser as User;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findFirst({ where: { email } });
    if (user === null) {
      return undefined;
    }
    return user as User;
  }
  public async findById(id: number): Promise<User | undefined> {
    const user = await prisma.user.findFirst({ where: { id } });
    if (user === null) {
      return undefined;
    }
    return user as User;
  }

  public async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users as User[];
  }

  public async updateUser(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: user
    });
    return updatedUser as User;
  }

}