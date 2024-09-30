import { Race } from "../../../domain/Race";

export interface RaceRepository {
  create(race: Race): Promise<Race>;
  getAll(): Promise<Race[]>;
  findById(id: string): Promise<Race>;
}