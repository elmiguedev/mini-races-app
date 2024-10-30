import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Race } from "../../domain/race/RaceData";
import { Action } from "../Action";

export interface PlayerInRaceActionParams {
  userId: number;
}

export class PlayerInRaceAction implements Action<PlayerInRaceActionParams, Race> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: PlayerInRaceActionParams) {
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }
    const user = await race.players.find((player) => player.user.id === params.userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.status = "inRace";
    if (race.players.every((player) => player.status === "inRace")) {
      race.status = "countdown";
    }
    return race;

  }

}
