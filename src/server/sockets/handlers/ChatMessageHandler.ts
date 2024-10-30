import { Socket } from "socket.io";
import { SocketServer } from "../SocketServer";
import { SendChatMessageAction } from "../../core/actions/race/SendChatMessageAction";

export class ChatMessageHandler {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: SendChatMessageAction
  ) { }

  public async handle(socket: Socket, message: string) {
    const user = this.socketServer.sockets[socket.id].user;
    const race = await this.action.execute({
      socketId: socket.id,
      message: message,
      userId: user.id
    })
    this.socketServer.emitToRoom(race.id, "room_chat", {
      message: message,
      name: user.name
    });
  }
}