import { Race } from "~/server/core/domain/race/RaceData";
import { RaceEntity } from "../entities/RaceEntity";

export interface RaceSceneProps {
  race: Race;
  socketId: string;
}

export class RaceScene extends Phaser.Scene {

  private raceEntity!: RaceEntity;

  constructor() {
    super("RaceScene");
  }

  init(data: RaceSceneProps) {
    this.raceEntity = new RaceEntity(
      this,
      data.race,
      data.socketId
    );
  }

  create() {
    this.add.text(10, 10, "Race");
  }
}