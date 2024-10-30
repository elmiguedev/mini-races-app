import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Race } from "../../domain/race/RaceData";
import { Action } from "../Action";

export interface PlayerReadyActionParams {
  userId: number;
}

export class PlayerReadyAction implements Action<PlayerReadyActionParams, Race> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: PlayerReadyActionParams) {
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }
    const user = await race.players.find((player) => player.user.id === params.userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.status = "ready";
    if (race.players.every((player) => player.status === "ready")) {
      race.status = "ready";
    }
    return race;

  }

}
