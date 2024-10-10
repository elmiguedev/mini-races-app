import { Player } from "../../domain/race/Player";
import { Race } from "../../domain/race/Race";
import { User } from "../../domain/user/User";
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

    const player = this.createPlayer(user);

    race.players.push(player);
    console.log(" >> se joinea un user a la carrera", race);
    return race;
  }

  private createPlayer(user: User): Player {
    return {
      socketId: "",
      user,
      car: {
        color: "red",
        id: user.id!,
        slots: [],
        userId: user.id!,
      },
      status: "lobby",
      playerRaceInfo: {
        acceleration: 0,
        angle: 0,
        bestLapTime: 0,
        currentCheckpoint: 0,
        currentCheckpointTime: 0,
        currentLap: 0,
        currentLapTime: 0,
        position: { x: 0, y: 0 },
        racePosition: 0,
        velocity: 0,
      },
    }
  }
}
