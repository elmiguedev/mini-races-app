import { Race } from "../domain/race/RaceData";

export class ServerRaceEntity {
  public race: Race;

  constructor(race: Race) {
    this.race = race;
  }


}