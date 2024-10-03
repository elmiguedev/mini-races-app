import { Race } from "../../../domain/Race";

export interface RaceRepository {
  create(race: Race): Promise<Race>;
  getAll(): Promise<Race[]>;
  getById(id: string): Promise<Race | undefined>;
  getByUserId(userId: string): Promise<Race | undefined>;
}