export interface Car {
  id: string;
  x: number;
  y: number;
  angle: number;
  racePosition: number;
  laps: number;
  currentCheckpoint: number;
  currentCheckpointTime: number;
  color: number;
  status: 'pending' | 'playing' | 'finished';
}