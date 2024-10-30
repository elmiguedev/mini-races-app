import { RaceData } from "../../domain/race/RaceData";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export class GetRaceByUserAction implements Action<number, RaceData | undefined> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  async execute(userId: number): Promise<RaceData | undefined> {
    const race = await this.raceRepository.getByUserId(userId);
    return race?.getData();
  }
}
