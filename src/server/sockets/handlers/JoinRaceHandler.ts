import { Socket } from "socket.io";
import { SocketServer } from "../SocketServer";
import { JoinRaceAction } from "../../core/actions/race/JoinRaceAction";

export class JoinRaceHandler {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: JoinRaceAction
  ) { }

  public async handle(socket: Socket, raceId: string) {
    console.log(">> handler del join race")
    const user = this.socketServer.sockets[socket.id].user;
    socket.join(raceId);
    console.log(">> se unio el socket al room id")
    const race = await this.action.execute({
      userId: user.id,
      raceId
    });

    console.log(">> la carrera como queda", race)
    this.socketServer.emitToRoom(raceId, "race_status", race);
    socket.emit("race_status", race);
  }
}