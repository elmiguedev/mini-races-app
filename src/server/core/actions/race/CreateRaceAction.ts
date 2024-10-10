import { Race } from "../../domain/race/Race";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";
import crypto from "node:crypto";


export class CreateRaceAction implements Action<void, Race> {

  constructor(private readonly raceRepository: RaceRepository) {
  }

  public async execute(): Promise<Race> {
    const randomIdString = this.generateId()
    const race: Race = {
      id: randomIdString,
      createdAt: new Date(),
      maxPlayers: 8,
      players: [],
      status: "lobby",
    };
    await this.raceRepository.create(race);
    return race;
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}