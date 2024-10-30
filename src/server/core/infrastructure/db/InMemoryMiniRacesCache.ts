import { Race } from "../../domain/race/RaceData";

export class InMemoryMiniRacesCache {
  public races: Record<string, Race> = {};

}