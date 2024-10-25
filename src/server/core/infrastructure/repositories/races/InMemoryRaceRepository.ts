import { Race } from "../../../domain/race/Race";
import { InMemoryMiniRacesCache } from "../../db/InMemoryMiniRacesCache";
import { RaceRepository } from "./RaceRepository";

export class InMemoryRaceRepository implements RaceRepository {

  constructor(private readonly cache: InMemoryMiniRacesCache) {
  }

  public getByUserId(userId: number): Promise<Race | undefined> {
    const races = Object.values(this.cache.races);
    return Promise.resolve(races.find(race => race.players.find(player => player.user.id === userId)));
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