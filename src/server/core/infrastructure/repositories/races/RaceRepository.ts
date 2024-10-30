import { ServerRaceEntity } from "../../../entities/ServerRaceEntity";

export interface RaceRepository {
  create(): Promise<ServerRaceEntity>;
  getAll(): Promise<ServerRaceEntity[]>;
  getById(id: string): Promise<ServerRaceEntity | undefined>;
  getByUserId(userId: number): Promise<ServerRaceEntity | undefined>;
  deleteRace(id: string): Promise<ServerRaceEntity>;
}