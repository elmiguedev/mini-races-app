import { LobbyUser } from "../../domain/LobbyUser";
import { Race } from "../../domain/Race";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { UserRepository } from "../../infrastructure/repositories/user/UserRepository";
import { Action } from "../Action";

export interface JoinRaceActionParams {
  userId: string;
  raceId: string;
}

export class JoinRaceAction implements Action<JoinRaceActionParams, Race> {
  constructor(
    private readonly raceRepository: RaceRepository,
    private readonly userRepository: UserRepository
  ) { }

  public async execute(params: JoinRaceActionParams): Promise<Race> {
    const race = await this.raceRepository.getById(params.raceId);
    const user = await this.userRepository.findById(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }

    if (!user) {
      throw new Error("User not found");
    }

    const lobbyUser: LobbyUser = {
      id: user.id!,
      name: user.name
    }


    race.lobbyUsers.push(lobbyUser);
    console.log(" >> se joinea un user a la carrera", race);
    return race;
  }
}