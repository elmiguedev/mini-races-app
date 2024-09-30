import { LobbyUser } from "../../domain/LobbyUser";
import { Race } from "../../domain/Race";
import { User } from "../../domain/User";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";
import crypto from "node:crypto";


export class CreateRaceAction implements Action<LobbyUser, Race> {

  constructor(private readonly raceRepository: RaceRepository) {
  }

  public async execute(user: LobbyUser): Promise<Race> {
    console.log(">> el user", user)
    const randomIdString = this.generateId()
    const race: Race = {
      id: randomIdString,
      createdAt: new Date(),
      lobbyUsers: [
        user
      ]
    };
    await this.raceRepository.create(race);
    return race;
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}