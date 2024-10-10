import { ObjectLiteral, Repository } from "typeorm";
import { User } from "../../../domain/user/User";
import { MiniRacesDB } from "../../db/MiniRacesDB";
import { UserDao } from "../../db/daos/UserDao";
import { CarRepository } from "./CarRepository";
import { CarPartModel } from "../../../domain/car/CarPartModel";
import { CarPartModelDao } from "../../db/daos/CarPartModelDao";

export class PgCarRepository implements CarRepository {

  private readonly carPartModelRepository: Repository<ObjectLiteral>;

  constructor(private readonly db: MiniRacesDB) {
    this.carPartModelRepository = db.getRepository(CarPartModelDao);
  }

  public async getPartModels(): Promise<CarPartModel[]> {
    const models = await this.carPartModelRepository.find() as CarPartModel[];
    return models;
  }

  public async createPartModel(model: CarPartModel): Promise<CarPartModel> {
    return this.carPartModelRepository.save(model);
  }

}