import { ServerRaceEntity } from "../../entities/ServerRaceEntity";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";


export class CreateRaceAction implements Action<void, ServerRaceEntity> {

  constructor(private readonly raceRepository: RaceRepository) {
  }

  public async execute(): Promise<ServerRaceEntity> {
    const race = await this.raceRepository.create();
    return race;
  }


}