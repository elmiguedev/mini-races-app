import { defineEventHandler } from "h3"
import { useActions } from "../../hooks/useActions";
import { RaceStatus } from "../../core/domain/race/RaceStatus";

export interface GetRacesResponse {
  id: string;
  players: string;
  createdAt: Date;
  status: RaceStatus;
}

export default defineEventHandler(async (event) => {
  const { getRacesAction } = useActions();
  const races = await getRacesAction.execute()
  const response: GetRacesResponse[] = races.map((race) => {
    return {
      id: race.id,
      players: `${race.players.length} / ${race.maxPlayers}`,
      createdAt: race.createdAt,
      status: race.status
    }
  });
  return response;
})