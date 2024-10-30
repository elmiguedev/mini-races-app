import { Car } from "../car/Car";
import { User } from "../user/User";
import { PlayerRaceInfo } from "./PlayerRaceInfo";
import { PlayerStatus } from "./PlayerStatus";

export interface PlayerData {
  socketId: string;
  status: PlayerStatus;
  name: string;
  playerRaceInfo: PlayerRaceInfo;
}