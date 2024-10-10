import type { Socket } from "socket.io-client";

export class RaceScene extends Phaser.Scene {

  private socket!: Socket;

  constructor() {
    super("RaceScene");
  }

  init(data: any) {
    this.socket = data.socket;
    console.log("LA RACE SCENE");
  }

  create() {
    console.log("CREA LA RACE SCENE")
    this.add.text(200, 200, "RACE", {
      fontSize: "32px",
      color: "black"
    })

    if (this.socket) {

      this.socket.on("race_status", (race: any) => {

        race.lobbyUsers.forEach((lobbyUser: any) => {
          this.add.text(200, 300, `${lobbyUser.id} - ${lobbyUser.name}`, {
            fontSize: "32px",
            color: "black"
          })
        })

      })

      this.socket.emit("race_status");
    }
  }
}