import { Socket } from "socket.io";
import { SocketServer } from "../SocketServer";
import { JoinRaceAction } from "../../core/actions/race/JoinRaceAction";

export class JoinRaceHandler {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: JoinRaceAction
  ) { }

  public async handle(socket: Socket, raceId: string) {
    const user = this.socketServer.sockets[socket.id].user;
    socket.join(raceId);
    const race = await this.action.execute({
      userId: user.id,
      raceId
    });
    this.socketServer.emitToRoom(raceId, "race_status", race);
  }
}