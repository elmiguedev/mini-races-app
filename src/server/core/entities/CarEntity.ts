import { Race } from "../domain/race/Race";

export class ServerRaceEntity {
  public race: Race;

  constructor(race: Race) {
    this.race = race;
  }


}