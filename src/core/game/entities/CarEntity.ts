import type { Scene } from "phaser";
import type { Car } from "../../domain/user/Car";

export class CarEntity {
  public state: Car;
  public scene: Scene;
  public sprite!: Phaser.GameObjects.Rectangle;
  public txtInfo!: Phaser.GameObjects.Text;

  constructor(scene: Scene, state: Car) {
    this.state = state;
    this.scene = scene;
    this.createSprite();
    this.createTxtInfo();
  }

  public destroy() {
    this.sprite.destroy(true);
  }

  public setPosition(x: number, y: number) {
    this.sprite.setPosition(x, y);
  }

  public setState(state: Car) {
    this.state = state;
    this.updateSprite();
    this.updateTxtInfo();
  }

  public moveLeft() {
    if (this.state.status === "playing")
      this.sprite.x -= 4;
  }

  public moveRight() {
    if (this.state.status === "playing")
      this.sprite.x += 4;
  }

  public moveUp() {
    if (this.state.status === "playing")
      this.sprite.y -= 4;
  }

  public moveDown() {
    if (this.state.status === "playing")
      this.sprite.y += 4;
  }
  private createSprite() {
    this.sprite = this.scene.add.rectangle(
      this.state.x,
      this.state.y,
      32,
      32,
      this.state.color
    );
    this.sprite.setDepth(5);
    this.sprite.setOrigin(0.5);
    this.scene.physics.add.existing(this.sprite);
    // this.sprite.body.setMaxSpeed(300);
    // this.sprite.body.drag.set(200);
  }

  private createTxtInfo() {
    this.txtInfo = this.scene.add.text(
      this.state.x,
      this.state.y - 40,
      "",
      {
        color: "black",
        align: "center",
        fontFamily: "Console"
      }
    ).setDepth(6).setOrigin(0.5, 0);
  }

  private updateTxtInfo() {
    this.txtInfo.setText(`laps: ${this.state.laps}, race pos: ${this.state.racePosition}, cp: ${this.state.currentCheckpoint}
      pos: ${this.state.x}, ${this.state.y}`);
    this.txtInfo.setPosition(this.state.x, this.state.y - 40);
  }

  private updateSprite() {
    this.sprite.setPosition(this.state.x, this.state.y);
    this.sprite.setAngle(this.state.angle);
  }

  public stop() {
    // this.sprite.body.setAcceleration(0);
    // this.sprite.body.setAngularVelocity(0);
  }

}