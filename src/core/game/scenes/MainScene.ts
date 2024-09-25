import { Scene } from "phaser";
import MapPng from "../assets/map.png";
import { Track } from "../entities/Track";
import { CarEntity } from "../entities/CarEntity";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";
import type { Car } from "../../domain/user/Car";

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

  // aca van los atributos nuevos
  private mainCar!: CarEntity;
  private socket!: Socket;
  private cars!: CarEntity[];

  constructor() {
    super("MainScene");
  }

  public preload() {
    this.load.image("map", MapPng);
  }

  public create() {
    this.cars = [];
    // this.car = new Car(this);
    // this.otherCar = new Car(this);
    // this.otherControls = {
    //   up: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    //   down: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    //   left: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    //   right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    // }
    this.track = new Track(this);

    this.createSocket();
    this.createControls();
  }

  public override update() {

    this.checkControls();
    // this.track.validateCheckpointOverlap(this.car);
    // this.track.validateCheckpointOverlap(this.otherCar);

    // this.validatePositions();

  }

  private createSocket() {
    this.socket = io();

    this.socket.on("cars_status", (cars: Car[]) => {
      cars.forEach((car) => {
        this.createCar(car);
      })
    });

    this.socket.on("car_connected", (car: Car) => {
      if (car.id !== this.socket.id) {
        this.createCar(car);
      }
    });

    this.socket.on("car_disconnected", (carId: string) => {
      const car = this.cars.find((c) => c.state.id === carId);
      if (car) {
        car.destroy();
        this.cars = this.cars.filter((c) => c.state.id !== carId);
      }
    });

    this.socket.on("car_status", (data) => {

      if (data.id === this.socket.id) {
        this.mainCar.setState(data);
      } else {
        const car = this.cars.find((c) => c.state.id === data.id);
        if (car) {
          car.setState(data);
        }
      }
    });


  }

  private createCar(carState: Car) {
    const carEntity = new CarEntity(
      this,
      carState
    );
    if (carState.id === this.socket.id) {
      this.mainCar = carEntity;
      this.cameras.main.startFollow(this.mainCar.sprite);
    } else {
      this.cars.push(carEntity);
    }
  }

  private createControls() {
    this.controls = this.input.keyboard!.createCursorKeys();
  }

  private checkControls() {
    if (this.controls.left.isDown) {
      this.mainCar.moveLeft();
      this.socket.emit("car_move", {
        id: this.socket.id,
        x: this.mainCar.sprite.x,
        y: this.mainCar.sprite.y
      })
    }
    if (this.controls.right.isDown) {
      this.mainCar.moveRight();
      this.socket.emit("car_move", {
        id: this.socket.id,
        x: this.mainCar.sprite.x,
        y: this.mainCar.sprite.y
      })
    }
    if (this.controls.up.isDown) {
      this.mainCar.moveUp();
      this.socket.emit("car_move", {
        id: this.socket.id,
        x: this.mainCar.sprite.x,
        y: this.mainCar.sprite.y
      })
    }
    if (this.controls.down.isDown) {
      this.mainCar.moveDown();
      this.socket.emit("car_move", {
        id: this.socket.id,
        x: this.mainCar.sprite.x,
        y: this.mainCar.sprite.y
      });
    }
  }

  private validatePositions() {
    // const cars = [this.car, this.otherCar];
    // cars.sort((a, b) => {
    //   return (a.laps - b.laps === 0 ?
    //     ((a.checkpoint - b.checkpoint) === 0
    //       ? b.checkpointTime - a.checkpointTime
    //       : a.checkpoint - b.checkpoint)
    //     : a.laps - b.laps);
    // });
    // cars.forEach((car, index) => {
    //   car.setRacePosition(index);
    // });
  }

}