import { ChatMessage } from "./ChatMessage";
import { PlayerData } from "./PlayerData";
import { RaceStatus } from "./RaceStatus";

export interface RaceData {
  id: string;
  maxPlayers: number;
  players: Record<string, PlayerData>;
  createdAt: Date;
  status: RaceStatus;
  chats: ChatMessage[];
}