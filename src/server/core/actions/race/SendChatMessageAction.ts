import { ChatMessage } from "../../domain/race/ChatMessage";
import { Race } from "../../domain/race/Race";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export interface SendChatMessageActionParams {
  message: string;
  userId: number;
  raceId: string;
}
export class SendChatMessageAction implements Action<SendChatMessageActionParams, Race> {
  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: SendChatMessageActionParams): Promise<Race> {
    const race = await this.raceRepository.getByUserId(params.userId);
    const player = race?.players.find((player) => player.user.id === params.userId);
    const chatMessage: ChatMessage = {
      name: player!.user.name,
      message: params.message
    }
    race!.chats.push(chatMessage);
    return race!;
  }
}