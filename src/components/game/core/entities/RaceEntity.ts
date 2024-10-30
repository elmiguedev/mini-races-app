import { Race } from "~/server/core/domain/race/Race";
import { PlayerEntity } from "./PlayerEntity";
import { Scene } from "phaser";
import { TrackEntity } from "./TrackEntity";

export class RaceEntity {
  private race: Race;
  private scene: Scene;
  private cars: Record<string, PlayerEntity> = {};
  private mainCar!: PlayerEntity;
  private track!: TrackEntity;
  private socketId: string;

  constructor(scene: Scene, race: Race, socketId: string) {
    this.scene = scene;
    this.race = race;
    this.socketId = socketId;

    this.createTrack();
    this.createPlayers();

    console.log("socket", this.socketId);
    console.log("race", this.race);
  }

  private createTrack() {
    this.track = new TrackEntity(this.scene);
  }

  private createPlayers() {
    this.race.players.forEach((player) => {
      this.cars[player.socketId] = new PlayerEntity(this.scene, player);
      if (player.socketId === this.socketId) {
        this.mainCar = this.cars[player.socketId];
        this.scene.cameras.main.startFollow(this.mainCar.sprite);
      }
    })
  }


}