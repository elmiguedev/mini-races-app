import { Race } from "../../domain/Race";

export class InMemoryMiniRacesCache {
  public races: Record<string, Race> = {};

}