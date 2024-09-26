import type { Car } from "../../domain/user/Car";

export class PodiumScene extends Phaser.Scene {

  private podium!: Car[];

  constructor() {
    super("PodiumScene");
  }

  public init(podium: Car[]) {
    this.podium = podium;
  }

  public create() {
    const x = this.game.canvas.width / 2;
    const y = 100;

    for (let i = 0; i < this.podium.length; i++) {
      const car = this.podium[i];
      this.add.text(x, y + 40 * i, `${i + 1} - ${car.id}`, {
        color: "black",
        fontFamily: "Console",
        fontSize: "16px",
        align: "center"
      }).setOrigin(0.5);
    }

    const button = this.add.text(x, 300, "RESTART", {
      backgroundColor: "black",
      fontFamily: "Console",
      fontSize: "16px",
      align: "center",
      padding: {
        x: 20,
        y: 10
      }
    });
    button.setOrigin(0.5);
    button.setInteractive({ cursor: "pointer" });
    button.on("pointerdown", () => this.scene.start("MainScene"));
  }
}