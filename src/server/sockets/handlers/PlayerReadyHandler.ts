import { Socket } from "socket.io";
import { SocketServer } from "../SocketServer";
import { PlayerReadyAction } from "~/server/core/actions/race/PlayerReadyAction";

export class PlayerReadyHandler {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: PlayerReadyAction
  ) { }

  public async handle(socket: Socket, params: any) {
    const user = this.socketServer.sockets[socket.id].user;
    const race = await this.action.execute({
      userId: user.id
    })
    this.socketServer.emitToRoom(race.id, "race_status", race);

  }
}