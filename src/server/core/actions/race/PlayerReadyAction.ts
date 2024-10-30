import { RaceData } from "../../domain/race/RaceData";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export interface PlayerReadyActionParams {
  userId: number;
}

export class PlayerReadyAction implements Action<PlayerReadyActionParams, RaceData> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: PlayerReadyActionParams) {
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }
    const user = await race.getPlayerByUserId(params.userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.setStatus("ready");
    race.checkPlayersReady();

    return race.getData();
  }

}
