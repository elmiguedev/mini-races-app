import { Car } from "../car/Car";
import { User } from "../user/User";
import { PlayerRaceInfo } from "./PlayerRaceInfo";
import { PlayerStatus } from "./PlayerStatus";

export interface Player {
  socketId: string;
  user: User;
  car: Car;
  status: PlayerStatus;
  playerRaceInfo: PlayerRaceInfo;
}