import { RaceData } from "../../../../server/core/domain/race/RaceData";
import { SocketManager } from "../../../../services/socket/SocketManager";
import { RaceEntity } from "../entities/RaceEntity";

export interface RaceSceneProps {
  race: RaceData;
  socketId: string;
}

export class RaceScene extends Phaser.Scene {

  private raceEntity!: RaceEntity;
  private controls !: Phaser.Types.Input.Keyboard.CursorKeys

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
    this.controls = this.input.keyboard!.createCursorKeys();

    SocketManager.getInstance().on("race_status", (data) => {
      if (this.raceEntity) {
        this.raceEntity.updateRaceState(data);
      }
    });
  }

  override update() {
    if (this.raceEntity) {
      const controls = {
        accelerate: this.controls.up.isDown,
        left: this.controls.left.isDown,
        right: this.controls.right.isDown
      };

      const anyPressed = Object.values(controls).some(Boolean);
      if (anyPressed) {
        SocketManager.getInstance().emit("player_move", controls);
      }
    }
  }
}