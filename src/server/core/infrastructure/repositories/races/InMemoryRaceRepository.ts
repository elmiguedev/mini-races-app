import { Race } from "../../../domain/Race";
import { InMemoryMiniRacesCache } from "../../db/InMemoryMiniRacesCache";
import { RaceRepository } from "./RaceRepository";

export class InMemoryRaceRepository implements RaceRepository {

  constructor(private readonly cache: InMemoryMiniRacesCache) {
  }

  public create(race: Race): Promise<Race> {
    this.cache.races[race.id] = race;
    return Promise.resolve(race);
  }
  public getAll(): Promise<Race[]> {
    return Promise.resolve(Object.values(this.cache.races));
  }
  public getById(id: string): Promise<Race | undefined> {
    return Promise.resolve(this.cache.races[id]);
  }

}