import { Race } from "../../domain/race/Race";

export class InMemoryMiniRacesCache {
  public races: Record<string, Race> = {};

}