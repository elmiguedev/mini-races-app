import { LobbyUser } from "../../domain/LobbyUser";
import { Race } from "../../domain/race/Race";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { UserRepository } from "../../infrastructure/repositories/user/UserRepository";
import { Action } from "../Action";

export interface LeaveRaceActionParams {
  userId: string;
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

    race.lobbyUsers = race.lobbyUsers.filter(
      (lobbyUser) => lobbyUser.id !== params.userId
    );

    return race;
  }
}