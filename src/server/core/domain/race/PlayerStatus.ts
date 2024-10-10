export const PlayerStatusTypes = {
  lobby: "lobby",
  countdown: "countdown",
  running: "running",
  finished: "finished",
} as const;

export type PlayerStatus = typeof PlayerStatusTypes[keyof typeof PlayerStatusTypes];