import { PlayerEntity } from "./PlayerEntity";
import { Scene } from "phaser";
import { TrackEntity } from "./TrackEntity";
import { RaceData } from "../../../../server/core/domain/race/RaceData";

export class RaceEntity {
  private race: RaceData;
  private scene: Scene;
  private cars: Record<string, PlayerEntity> = {};
  private mainCar!: PlayerEntity;
  private track!: TrackEntity;
  private socketId: string;

  constructor(scene: Scene, race: RaceData, socketId: string) {
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
    Object.values(this.race.players).forEach((player) => {
      this.cars[player.socketId] = new PlayerEntity(this.scene, player);
      if (player.socketId === this.socketId) {
        this.mainCar = this.cars[player.socketId];
        this.scene.cameras.main.startFollow(this.mainCar.sprite);
      }
    })
  }

  public updateRaceState(race: RaceData) {
    this.race = race;
    this.updatePlayers();
  }

  public movePlayer(controls: any) {
    if (this.mainCar) {

    }
  }

  private updatePlayers() {
    Object.values(this.race.players).forEach((player) => {
      this.cars[player.socketId].updatePlayerData(player);
    });
  }

}