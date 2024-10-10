import { Race } from "../../domain/race/Race";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export class GetRacesAction implements Action<void, Race[]> {
  constructor(private readonly raceRepository: RaceRepository) { }

  public execute() {
    return this.raceRepository.getAll();
  }
}