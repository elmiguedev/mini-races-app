import { Player } from "./Player";
import { RaceStatus } from "./RaceStatus";

export interface Race {
  id: string;
  maxPlayers: number;
  players: Player[];
  createdAt: Date;
  status: RaceStatus;
}