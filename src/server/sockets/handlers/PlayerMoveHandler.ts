import { Socket } from "socket.io";
import { SocketServer } from "../SocketServer";
import { PlayerInRaceAction } from "~/server/core/actions/race/PlayerInRaceAction";
import { PlayerMoveAction } from "../../core/actions/race/PlayerMoveAction";

export interface PlayerMoveHandlerParams {
  accelerate?: boolean
  left?: boolean
  right?: boolean
}

export class PlayerMoveHandler {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: PlayerMoveAction
  ) { }

  public async handle(socket: Socket, params: PlayerMoveHandlerParams) {
    const user = this.socketServer.sockets[socket.id].user;
    const player = await this.action.execute({
      userId: user.id,
      ...params
    });

    console.log(">> player moved", player.playerRaceInfo);
  }
}