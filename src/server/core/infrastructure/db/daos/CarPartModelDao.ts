import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../domain/user/User";
import { CarPartModel } from "../../../domain/car/CarPartModel";
import { CarPartType } from "../../../domain/car/CarPartType";

@Entity("car_part_model")
export class CarPartModelDao implements CarPartModel {
  @PrimaryGeneratedColumn()
  id?: string | undefined;

  @Column()
  name: string = "";

  @Column()
  type: CarPartType = "body";

  @Column()
  acceleration: number = 0;

  @Column()
  velocity: number = 0;

  @Column()
  steering: number = 0;

  @Column()
  resistance: number = 0;
}