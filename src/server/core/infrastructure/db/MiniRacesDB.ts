import { DataSource } from "typeorm";
import { UserDao } from "./daos/UserDao";
import { CarPartModelDao } from "./daos/CarPartModelDao";

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
        UserDao,
        CarPartModelDao
      ],
      synchronize: Boolean(process.env.PG_SYNC) || false,
    })
  }

  public async init() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
  }

  public getRepository(entity: any) {
    return this.dataSource.getRepository(entity);
  }
}