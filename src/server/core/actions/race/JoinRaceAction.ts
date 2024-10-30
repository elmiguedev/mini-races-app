import { RaceData } from "../../domain/race/RaceData";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { UserRepository } from "../../infrastructure/repositories/user/UserRepository";
import { Action } from "../Action";

export interface JoinRaceActionParams {
  userId: number;
  raceId: string;
  socketId: string;
}

export class JoinRaceAction implements Action<JoinRaceActionParams, RaceData> {
  constructor(
    private readonly raceRepository: RaceRepository,
    private readonly userRepository: UserRepository
  ) { }

  public async execute(params: JoinRaceActionParams): Promise<RaceData> {
    const race = await this.raceRepository.getById(params.raceId);
    const user = await this.userRepository.findById(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }

    if (!user) {
      throw new Error("User not found");
    }

    race.addPlayer(
      params.socketId,
      user
    )

    return race.getData();
  }


}
