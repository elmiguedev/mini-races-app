import { DataSource } from "typeorm";
import { UserDao } from "./daos/UserDao";

export class MiniRacesDB {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [
        UserDao
      ],
      synchronize: Boolean(process.env.PG_SYNC) || false,
    })
  }

  public init() {
    return this.dataSource.initialize();
  }

  public getRepository(entity: any) {
    return this.dataSource.getRepository(entity);
  }
}