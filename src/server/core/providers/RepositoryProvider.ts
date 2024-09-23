import { MiniRacesDB } from "../infrastructure/db/MiniRacesDB";
import { PgUserRepository } from "../infrastructure/repositories/user/PgUserRepository";
import { UserRepository } from "../infrastructure/repositories/user/UserRepository";

export class RepositoryProvider {
  // db
  private db: MiniRacesDB;

  // repositories
  public userRepository: UserRepository;

  // singleton
  private static instance: RepositoryProvider;
  public static getInstance() {
    if (!RepositoryProvider.instance) {
      RepositoryProvider.instance = new RepositoryProvider();
    }
    return RepositoryProvider.instance;
  }

  // intialize repositories
  private constructor() {
    this.db = new MiniRacesDB();
    this.userRepository = new PgUserRepository(this.db);

  }

  public init() {
    this.db.init();
  }
}