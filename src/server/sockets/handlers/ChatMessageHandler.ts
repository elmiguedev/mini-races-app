import { Socket } from "socket.io";
import { SocketServer } from "../SocketServer";
import { SendChatMessageAction } from "../../core/actions/race/SendChatMessageAction";

export class ChatMessageHandler {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: SendChatMessageAction
  ) { }

  public async handle(socket: Socket, message: string) {
    console.log(">> el handler", message)
    const user = this.socketServer.sockets[socket.id].user;
    const race = await this.action.execute({
      userId: user.id,
      message: message,
      raceId: user.raceId
    })
    console.log(">> el user", user)
    this.socketServer.emitToRoom(race.id, "room_chat", {
      message: message,
      name: user.name
    });
  }
}