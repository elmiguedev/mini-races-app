import { Body, BoxShape, Vec2, World } from "planck";
import { Player } from "../domain/race/Player";

export class PlayerEntity {
  private player: Player;
  private world: World;
  private body: Body;

  constructor(player: Player, world: World) {
    this.player = player;
    this.world = world;
    this.body = world.createBody({
      type: 'dynamic',
      position: Vec2(player.playerRaceInfo.position.x, player.playerRaceInfo.position.y),
      angle: player.playerRaceInfo.angle,
      linearDamping: 0.5
    });
    this.body.createFixture({
      shape: new BoxShape(32, 32),
    });
  }
}