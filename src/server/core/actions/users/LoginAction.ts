import { User } from "../../../../core/domain/user/User";
import { UserRepository } from "../../infrastructure/repositories/user/UserRepository";
import { Action } from "../Action";
import * as bcrypt from 'bcrypt';

export interface LoginActionParams {
  email: string;
  password: string;
}

export class LoginAction implements Action<LoginActionParams, User | undefined> {
  constructor(private readonly userRepository: UserRepository) {
  }

  public async execute(input: LoginActionParams): Promise<User | undefined> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) return;
    if (!this.validatePassword(user, input.password)) return;
    return user;
  }

  private validatePassword(user: User, password: string): boolean {
    return bcrypt.compareSync(password, user.password!);
  }
}
