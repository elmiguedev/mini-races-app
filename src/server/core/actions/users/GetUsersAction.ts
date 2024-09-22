import { User } from "../../../../core/domain/user/User";
import { UserRepository } from "../../infrastructure/repositories/user/UserRepository";
import { Action } from "../Action";

export class GetUsersAction implements Action<void, User[]> {
  constructor(private readonly userRepository: UserRepository) { }
  public execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}