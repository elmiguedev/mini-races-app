import { Race } from "../../domain/race/Race";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export class GetRaceByUserAction implements Action<string, Race | undefined> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  async execute(userId: string): Promise<Race | undefined> {
    return this.raceRepository.getByUserId(userId);
  }
}
