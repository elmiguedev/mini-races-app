import { LobbyUser } from "./LobbyUser";
import { User } from "./User";

export interface Race {
  id: string;
  createdAt: Date;
  lobbyUsers?: LobbyUser[];
}