import { GetRaceAction } from "../../core/actions/race/GetRaceAction";
import { SocketServer } from "../SocketServer";

export class RaceStatusEmitter {
  constructor(
    private readonly socketServer: SocketServer,
    private readonly action: GetRaceAction
  ) { }

  public emit(raceId: string) {
    const race = this.action.execute(raceId);
    this.socketServer.emitToRoom(raceId, "race_status", race);
  }
}