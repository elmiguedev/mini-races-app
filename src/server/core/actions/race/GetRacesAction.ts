import { RaceData } from "../../domain/race/RaceData";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export class GetRacesAction implements Action<void, RaceData[]> {
  constructor(private readonly raceRepository: RaceRepository) { }

  public async execute() {
    const races = await this.raceRepository.getAll();
    return races.map(race => race.getData());
  }
}