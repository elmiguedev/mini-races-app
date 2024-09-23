import { ObjectLiteral, Repository } from "typeorm";
import { User } from "../../../../../core/domain/user/User";
import { MiniRacesDB } from "../../db/MiniRacesDB";
import { UserRepository } from "./UserRepository";
import { UserDao } from "../../db/daos/UserDao";

export class PgUserRepository implements UserRepository {

  private readonly repository: Repository<ObjectLiteral>;

  constructor(private readonly db: MiniRacesDB) {
    this.repository = db.getRepository(UserDao);
  }

  public async create(user: User): Promise<User> {
    return this.repository.save(user);
  }
  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } }) as User;
    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } }) as User;
    return user;
  }

  public async getAll(): Promise<User[]> {
    const users = await this.repository.find() as User[];
    return users;
  }

}