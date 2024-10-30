import { ServerRaceEntity } from "../../../entities/ServerRaceEntity";
import { RaceRepository } from "./RaceRepository";

export class InMemoryRaceRepository implements RaceRepository {

  private races: Record<string, ServerRaceEntity> = {};

  public create(): Promise<ServerRaceEntity> {
    const race = new ServerRaceEntity();
    this.races[race.getId()] = race;
    return Promise.resolve(race);
  }

  public getById(id: string): Promise<ServerRaceEntity | undefined> {
    return Promise.resolve(this.races[id]);
  }

  public getByUserId(userId: number): Promise<ServerRaceEntity | undefined> {
    const races = Object.values(this.races);
    return Promise.resolve(races.find(race => race.hasUserId(userId)));
  }

  public getAll(): Promise<ServerRaceEntity[]> {
    return Promise.resolve(Object.values(this.races));
  }

  public deleteRace(id: string): Promise<ServerRaceEntity> {
    const race = this.races[id];
    delete this.races[id];
    return Promise.resolve(race);
  }


}