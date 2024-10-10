import type { Scene } from "phaser";

export class Car {
  private shape: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;

  public checkpoint: number = 0;
  public checkpointTime: number = 0;
  public laps: number = 0;
  public racePosition: number = 0;

  constructor(private readonly scene: Scene) {
    const randomColor = Math.floor(Math.random() * 16777215);
    this.shape = scene.add.rectangle(200, 400, 32, 32, randomColor);
    this.scene.add.existing(this.shape);
    this.scene.cameras.main.startFollow(this.shape);
    this.shape.setDepth(5);
    this.text = this.scene.add.text(200, 400, "0", {
      fontSize: "16px",
      color: "#000000"
    }).setDepth(6).setOrigin(0);
  }

  public setPosition(x: number, y: number) {
    this.shape.setPosition(x, y);
    this.text.setPosition(x, y - 32);
  }

  public getPosition() {
    return {
      x: this.shape.x,
      y: this.shape.y
    }
  }

  public setCheckpoint(id: number) {
    this.checkpoint = id;
    this.checkpointTime = Date.now();
    this.updateText();
  }

  public setRacePosition(position: number) {
    this.racePosition = position;
    this.updateText()
  }

  public increaseLap() {
    this.laps++;
    this.checkpoint = 0;
    this.updateText()
  }

  decreaseLap(checkpoint: number) {
    this.laps--;
    this.checkpoint = checkpoint;
    this.updateText()
  }

  private updateText() {
    this.text.setText(`laps: ${this.laps}, pos: ${this.racePosition}, cp: ${this.checkpoint}`);
  }

}