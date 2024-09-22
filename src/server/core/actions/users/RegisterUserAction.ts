import { User } from "../../../../core/domain/user/User";
import { UserRepository } from "../../infrastructure/repositories/user/UserRepository";
import { Action } from "../Action";

export interface RegisterUserActionParams {
  email: string;
  password: string;
}

export class RegisterUserAction implements Action<RegisterUserActionParams, User> {

  constructor(private readonly userRepository: UserRepository) {

  }

  public execute(params: RegisterUserActionParams): Promise<User> {
    const user: User = {
      email: params.email,
      name: params.email,
    };
    return this.userRepository.create(user);
  }
}