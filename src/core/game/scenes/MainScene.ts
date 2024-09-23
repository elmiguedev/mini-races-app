import { Scene } from "phaser";
import { Car } from "../entities/Car";
import MapPng from "../assets/map.png";
import { Track } from "../entities/Track";

export class MainScene extends Scene {
  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private otherControls!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  }
  private car!: Car;
  private otherCar!: Car;
  private track!: Track;

  constructor() {
    super("MainScene");
  }

  public preload() {
    this.load.image("map", MapPng);
  }

  public create() {
    this.car = new Car(this);
    this.otherCar = new Car(this);
    this.controls = this.input.keyboard!.createCursorKeys();
    this.otherControls = {
      up: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    }
    this.track = new Track(this);
  }

  public override update() {
    if (this.controls.left.isDown) {
      this.car.setPosition(this.car.getPosition().x - 4, this.car.getPosition().y);
    }
    if (this.controls.right.isDown) {
      this.car.setPosition(this.car.getPosition().x + 4, this.car.getPosition().y);
    }
    if (this.controls.up.isDown) {
      this.car.setPosition(this.car.getPosition().x, this.car.getPosition().y - 4);
    }
    if (this.controls.down.isDown) {
      this.car.setPosition(this.car.getPosition().x, this.car.getPosition().y + 4);
    }

    if (this.otherControls.left.isDown) {
      this.otherCar.setPosition(this.otherCar.getPosition().x - 4, this.otherCar.getPosition().y);
    }
    if (this.otherControls.right.isDown) {
      this.otherCar.setPosition(this.otherCar.getPosition().x + 4, this.otherCar.getPosition().y);
    }
    if (this.otherControls.up.isDown) {
      this.otherCar.setPosition(this.otherCar.getPosition().x, this.otherCar.getPosition().y - 4);
    }
    if (this.otherControls.down.isDown) {
      this.otherCar.setPosition(this.otherCar.getPosition().x, this.otherCar.getPosition().y + 4);
    }

    this.track.validateCheckpointOverlap(this.car);
    this.track.validateCheckpointOverlap(this.otherCar);

    this.validatePositions();

  }


  private validatePositions() {
    const cars = [this.car, this.otherCar];
    cars.sort((a, b) => {
      return (a.laps - b.laps === 0 ?
        ((a.checkpoint - b.checkpoint) === 0
          ? b.checkpointTime - a.checkpointTime
          : a.checkpoint - b.checkpoint)
        : a.laps - b.laps);
    });
    cars.forEach((car, index) => {
      car.setRacePosition(index);
    });
  }

}