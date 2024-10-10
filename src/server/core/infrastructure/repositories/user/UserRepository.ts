import { User } from "../../../domain/user/User";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  getAll(): Promise<User[]>
}