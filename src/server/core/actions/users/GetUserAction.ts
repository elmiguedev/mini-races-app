import { User } from "../../../../core/domain/user/User";
import { UserRepository } from "../../infrastructure/repositories/user/UserRepository";
import { Action } from "../Action";

export class GetUserAction implements Action<string, User> {
  constructor(private readonly userRepository: UserRepository) { }
  public execute(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}