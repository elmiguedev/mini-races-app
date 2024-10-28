import { Socket } from "socket.io";
import { SocketServer } from "../SocketServer";
import { PlayerInRaceAction } from "~/server/core/actions/race/PlayerInRaceAction";

export class PlayerInRaceHandler {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: PlayerInRaceAction
  ) { }

  public async handle(socket: Socket, params: any) {
    const user = this.socketServer.sockets[socket.id].user;
    const race = await this.action.execute({
      userId: user.id
    });
    this.socketServer.emitToRoom(race.id, "race_status", race);
  }
}