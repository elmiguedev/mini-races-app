import { Player } from "../../domain/race/Player";
import { RaceRepository } from "../../infrastructure/repositories/races/RaceRepository";
import { Action } from "../Action";

export interface PlayerMoveActionParams {
  userId: number;
  accelerate?: boolean;
  left?: boolean;
  right?: boolean;
}

export class PlayerMoveAction implements Action<PlayerMoveActionParams, Player> {

  constructor(
    private readonly raceRepository: RaceRepository
  ) { }

  public async execute(params: PlayerMoveActionParams) {
    // TODO: improve to get race from socketid as also the player
    const race = await this.raceRepository.getByUserId(params.userId);
    if (!race) {
      throw new Error("Race not found");
    }
    const player = race.players.find((player) => player.user.id === params.userId);
    if (!player) {
      throw new Error("Player not found");
    }

    if (params.accelerate) {
      const cosx = Math.cos(carBody.getAngle());
      const sinx = Math.sin(carBody.getAngle());
      const acc = 26;
      carBody.applyLinearImpulse(
        Vec2(cosx * acc, sinx * acc),
        carBody.getWorldCenter(),
      )


    }

    return player
  }
}

// const { up, left, right } = controls;
//   const carBody: Body = car.body;
//   if (up) {
//     const cosx = Math.cos(carBody.getAngle());
//     const sinx = Math.sin(carBody.getAngle());
//     const acc = 26;
//     carBody.applyLinearImpulse(
//       Vec2(cosx * acc, sinx * acc),
//       carBody.getWorldCenter(),
//     )
//   }

//   if (left) {
//     const currentAngle = carBody.getAngle();
//     carBody.setAngle(currentAngle - 0.05);
//   }

//   if (right) {
//     const currentAngle = carBody.getAngle();
//     carBody.setAngle(currentAngle + 0.05);
//   }