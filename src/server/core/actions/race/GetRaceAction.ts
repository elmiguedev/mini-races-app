import { Race } from "../../domain/Race";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export class GetRaceAction implements Action<string, Race | undefined> {
  constructor(private readonly raceRepository: RaceRepository) { }

  public execute(id: string) {
    return this.raceRepository.getById(id);
  }
}