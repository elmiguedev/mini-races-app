import { Scene } from "phaser";
import MapPng from "../assets/map.png";
import { Track } from "../entities/Track";
import { CarEntity } from "../entities/CarEntity";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";
import type { Car } from "../../domain/user/Car";

export class MainScene extends Scene {

  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private track!: Track;
  private mainCar!: CarEntity;
  private socket!: Socket;
  private cars!: CarEntity[];
  private txtCountdown!: Phaser.GameObjects.Text;

  constructor() {
    super("MainScene");
  }

  public preload() {
    this.load.image("map", MapPng);
  }

  public create() {
    this.cars = [];

    this.track = new Track(this);

    this.createSocket();
    this.createControls();
    this.createSceneEvents();
    this.createCountdownText();
  }

  public override update() {
    this.checkControls();
  }

  private createSceneEvents() {
    this.events.on("shutdown", () => {
      this.closeSocket();
    })
    this.events.on("destroy", () => {
      this.closeSocket();
    })
  }

  private closeSocket() {
    if (this.socket) {
      this.socket.close();
    }

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

    this.socket.on("race_finished", (podium: Car[]) => {
      console.log(">> race finished");

      this.scene.start("PodiumScene", podium);
    });

    this.socket.on("race_countdown", () => {
      this.startCountdown();
    });

    this.socket.on("race_start", () => {
      this.txtCountdown.setText("GO GO GO");
      setTimeout(() => {
        this.txtCountdown.setVisible(false);
      }, 3000);
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

  private createCountdownText() {
    this.txtCountdown = this.add.text(200, 400, "", {
      fontSize: "32px",
      color: "black"
    }).setOrigin(0.5).setDepth(10);
  }

  private startCountdown() {
    this.txtCountdown.setText("3");
    setTimeout(() => {
      this.txtCountdown.setText("2");
    }, 1000);
    setTimeout(() => {
      this.txtCountdown.setText("1");
    }, 2000);
    setTimeout(() => {
      this.txtCountdown.setText("");
    }, 3000);
  }


}