import { Race } from "~/server/core/domain/race/RaceData";
import { SocketManager } from "../../../../services/socket/SocketManager";
import CarPng from "../assets/sprites/car.png";
import MapPng from "../assets/img/map.png";

export class StartScene extends Phaser.Scene {

  private socketManager!: SocketManager;
  private race!: Race;

  constructor() {
    super('start-scene');
  }

  preload() {
    this.load.image("car", CarPng);
    this.load.image("map", MapPng);
  }

  create() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2;
    const txt = this.add.text(x, y, "waiting", {
      color: "black",
      fontFamily: "Consolas",
      fontSize: "16px",
      align: "center"
    });
    txt.setOrigin(0.5);

    SocketManager.getInstance().emit("player_in_race", {});

    SocketManager.getInstance().on("race_status", (data) => {
      this.race = data;
      if (data.status === "countdown") {
        txt.destroy();
        this.createCountdown()
      }
    })
  }

  createCountdown() {
    let contador = 3;
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2;
    const t = this.add.text(x, y, contador.toString(), {
      color: "black",
      fontFamily: "Consolas",
      fontSize: "16px",
      align: "center"
    })
    const timer = setInterval(() => {
      contador--;
      if (contador <= 0) {
        clearInterval(timer);
        this.scene.start("RaceScene", {
          race: this.race,
          socketId: SocketManager.getInstance().getId()
        });
      }
      t.setText(contador.toString());
    }, 1000)
  }
}