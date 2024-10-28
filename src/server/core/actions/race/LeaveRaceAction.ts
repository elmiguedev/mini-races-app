import { Race } from "../../domain/race/Race";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export interface LeaveRaceActionParams {
  userId: number;
}

export class LeaveRaceAction implements Action<LeaveRaceActionParams, Race> {
  constructor(
    private readonly raceRepository: RaceRepository,
  ) { }

  public async execute(params: LeaveRaceActionParams): Promise<Race> {
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }

    race.players = race.players.filter(
      (player) => player.user.id !== params.userId
    );

    if (race.players.length === 0) {
      await this.raceRepository.deleteRace(race);
    }

    return race;
  }
}