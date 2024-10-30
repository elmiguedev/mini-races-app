import { Body, BoxShape, Vec2, World } from "planck";
import { PlayerData } from "../domain/race/PlayerData";
import { PlayerRaceInfo } from "../domain/race/PlayerRaceInfo";
import { PlayerStatus } from "../domain/race/PlayerStatus";
import { Car } from "../domain/car/Car";
import { User } from "../domain/user/User";

export interface ServerPlayerEntityProps {
  socketId: string;
  user: User;
  world: World;
}

export class ServerPlayerEntity {
  private socketId: string;
  private user: User;
  private car: Car;
  private status: PlayerStatus;
  private playerRaceInfo: PlayerRaceInfo;
  private world: World;
  private body: Body;

  constructor(props: ServerPlayerEntityProps) {
    this.socketId = props.socketId;
    this.world = props.world;
    this.body = this.world.createBody({
      type: 'dynamic',
      position: Vec2(0, 0),
      angle: 0,
      linearDamping: 0.5
    });
    this.body.createFixture({
      shape: new BoxShape(32, 32),
    });
    this.playerRaceInfo = {
      acceleration: 0,
      angle: 0,
      bestLapTime: 0,
      currentCheckpoint: 0,
      currentCheckpointTime: 0,
      currentLap: 0,
      currentLapTime: 0,
      position: { x: 0, y: 0 },
      racePosition: 0,
      velocity: 0,
    };
    this.status = "lobby";
    this.user = props.user;
    this.car = {
      color: "red",
      id: this.user.id!, // TODO: map car
      userId: this.user.id!,
    }
  }

  public getData(): PlayerData {
    return {
      name: this.user.name,
      socketId: this.socketId,
      status: this.status,
      playerRaceInfo: this.playerRaceInfo,
    };
  }

  public getUserId(): number {
    return this.user.id!;
  }

  public getSocketId(): string {
    return this.socketId;
  }
}