import type { Scene } from "phaser";
import type { Car } from "./Car";

export class Track {

  public checkpoints: Phaser.GameObjects.Rectangle[] = [];

  constructor(private readonly scene: Scene) {
    this.scene.add.image(0, 0, "map")
      .setOrigin(0, 0)
      .setDepth(1);

    this.createCheckpoints();
  }

  public createCheckpoints() {
    this.addCheckpoint(100, 500, 170, 20, 0);
    this.addCheckpoint(400, 70, 20, 140, 1);
    this.addCheckpoint(750, 300, 170, 20, 2);
    this.addCheckpoint(500, 600, 140, 20, 3);
    this.addCheckpoint(750, 800, 170, 20, 4);
    this.addCheckpoint(500, 800, 20, 140, 5);
  }

  public addCheckpoint(x: number, y: number, width: number, height: number, id: number) {
    const checkpoint = this.scene.add.rectangle(x, y, width, height, 0xff0000).setData("checkpoint", id);
    checkpoint.setDepth(2).setOrigin(0);
    this.checkpoints.push(checkpoint);

  }

  public validateCheckpointOverlap(car: Car) {
    for (let i = 0; i < this.checkpoints.length; i++) {
      if (
        car.getPosition().x >= this.checkpoints[i].x &&
        car.getPosition().x <= this.checkpoints[i].x + this.checkpoints[i].width &&
        car.getPosition().y >= this.checkpoints[i].y &&
        car.getPosition().y <= this.checkpoints[i].y + this.checkpoints[i].height
      ) {
        const id = this.checkpoints[i].getData("checkpoint");

        // si el car pasa por el mismo checkpoint que ya esta, no hace nada
        if (id === car.checkpoint) {
          return;
        }

        // si el car pasa por un checkpoint inmediatamente superior, avanza
        if (car.checkpoint + 1 === id) {
          car.setCheckpoint(id);
          return;

        }

        // si el car pasa por un checkpoint inmediatamente inferior, retrocede
        if (car.checkpoint - 1 === id) {
          car.setCheckpoint(id);
          return;

        }

        // si el car pasa por la meta, y venia con el ultimo check, avanza de lap
        if (id === 0 && car.checkpoint === this.checkpoints.length - 1) {
          car.increaseLap();
          return;

        }

        if (id === 0 && car.checkpoint === 1) {
          car.decreaseLap(this.checkpoints.length - 1);
          return;
        }

        // si el car pasa por el ultimo check y el car estaba en la meta, le resta una vuelta
        // if (id === this.checkpoints.length - 1 && car.checkpoint === 0) {
        //   return;

        // }

        const position = this.getCheckpointPosition(car.checkpoint);
        car.setPosition(position.x, position.y);
      }
    }
  }

  public getCheckpointPosition(id: number) {
    return {
      x: this.checkpoints[id].x,
      y: this.checkpoints[id].y
    }
  }
}