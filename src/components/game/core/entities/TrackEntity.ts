import { Scene } from "phaser";

export class TrackEntity {
  private scene: Scene;
  private map: Phaser.GameObjects.Image;

  constructor(scene: Scene) {
    this.scene = scene;
    this.map = this.scene.add.image(0, 0, 'map').setOrigin(0, 0).setDepth(1);
  }
}