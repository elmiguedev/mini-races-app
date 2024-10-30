import { RaceData } from "../../domain/race/RaceData";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export class GetRaceAction implements Action<string, RaceData | undefined> {
  constructor(private readonly raceRepository: RaceRepository) { }

  public async execute(id: string) {
    const race = await this.raceRepository.getById(id);
    return race?.getData();
  }
}