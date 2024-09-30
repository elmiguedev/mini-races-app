import { Race } from "../Race";
import { User } from "../User";

export interface RaceService {
  createRace(userId: string): Promise<Race>;
}