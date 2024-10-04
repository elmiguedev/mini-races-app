import { Scene } from "phaser";
import MapPng from "../assets/img/map.png";
import { Track } from "../entities/Track";
import { CarEntity } from "../entities/CarEntity";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";
import type { Car } from "../../domain/user/Car";
import CarPng from "../assets/sprites/car.png";

export class MainScene extends Scene {

  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private track!: Track;
  private mainCar!: CarEntity;
  private socket!: Socket;
  private cars!: CarEntity[];
  private txtCountdown!: Phaser.GameObjects.Text;
  public walls!: Phaser.Physics.Arcade.Group;


  constructor() {
    super("MainScene");
  }

  public preload() {
    this.load.image("map", MapPng);
    this.load.image("car", CarPng)
  }

  public create() {
    this.cars = [];

    this.track = new Track(this);

    this.createSocket();
    this.createControls();
    this.createSceneEvents();
    this.createCountdownText();


    this.walls = this.physics.add.group({
      immovable: true
    });
    const r = this.add.rectangle(0, 0, 100, 1000, 0xff0000).setOrigin(0).setDepth(20);
    this.physics.add.existing(r);
    this.walls.add(r);

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
    // this.socket = io();
    this.socket = this.registry.get("socket");
    if (!this.socket) {
      throw new Error("Socket not initialized");
    }

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
      this.physics.add.collider(this.walls, this.mainCar.sprite);

    } else {
      this.cars.push(carEntity);
    }
  }

  private createControls() {
    this.controls = this.input.keyboard!.createCursorKeys();
  }

  private checkControls() {
    if (this.mainCar)
      this.mainCar.stop();
    if (this.controls.left.isDown) {
      // this.mainCar.moveLeft();
      // this.socket.emit("car_move", {
      //   id: this.socket.id,
      //   x: this.mainCar.sprite.x,
      //   y: this.mainCar.sprite.y
      // })
      // this.mainCar.sprite.body.setAngularVelocity(-150);
      this.socket.emit("car_controls", { left: true });
    }
    if (this.controls.right.isDown) {
      // this.mainCar.moveRight();
      // this.socket.emit("car_move", {
      //   id: this.socket.id,
      //   x: this.mainCar.sprite.x,
      //   y: this.mainCar.sprite.y
      // })
      // this.mainCar.sprite.body.setAngularVelocity(150);
      this.socket.emit("car_controls", { right: true });
    }

    if (this.controls.up.isDown) {
      // this.mainCar.moveUp();
      // this.socket.emit("car_move", {
      //   id: this.socket.id,
      //   x: this.mainCar.sprite.x,
      //   y: this.mainCar.sprite.y
      // })
      // this.physics.velocityFromAngle(this.mainCar.sprite.body.rotation, 1200, this.mainCar.sprite.body.acceleration);
      this.socket.emit("car_controls", { up: true });

    }
    if (this.controls.down.isDown) {
      // this.mainCar.moveDown();
      // this.socket.emit("car_move", {
      //   id: this.socket.id,
      //   x: this.mainCar.sprite.x,
      //   y: this.mainCar.sprite.y
      // });

    }

    // if (this.mainCar) {
    //   this.socket.emit("car_move", {
    //     id: this.socket.id,
    //     x: this.mainCar.sprite.x,
    //     y: this.mainCar.sprite.y
    //   })
    // }
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