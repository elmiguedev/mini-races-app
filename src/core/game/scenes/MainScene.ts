import { Scene } from "phaser";

export class MainScene extends Scene {
  constructor() {
    super('MainScene');
  }

  init() {
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffffff)
    this.add.text(100, 100, "HOLA MUNDO", {
      color: "black"
    })
  }
}