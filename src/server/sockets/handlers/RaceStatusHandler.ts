import { Socket } from "socket.io";
import { SocketServer } from "../SocketServer";
import { GetRaceByUserAction } from "~/server/core/actions/race/GetRaceByUserAction";

export class RaceStatusHandler {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: GetRaceByUserAction
  ) { }

  public async handle(socket: Socket, data: any) {
    const user = this.socketServer.sockets[socket.id].user;
    const race = await this.action.execute(user.id);
    socket.emit("race_status", race);
  }
}