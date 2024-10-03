import { Socket } from "socket.io";
import { SocketServer } from "../SocketServer";
import { LeaveRaceAction } from "../../core/actions/race/LeaveRaceAction";

export class DisconnectHandler {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: LeaveRaceAction
  ) { }

  public async handle(socket: Socket, raceId: string) {
    const user = this.socketServer.sockets[socket.id].user;
    delete this.socketServer.sockets[socket.id];
    const race = await this.action.execute({
      userId: user.id,
    });
    console.log(">> cliente desconectado", socket.id);
    this.socketServer.emitToRoom(race.id, "race_status", race);
  }
}