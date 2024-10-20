import { Car } from "./Car";
import { CarPart } from "./CarPart";
import { CarPartType } from "./CarPartType";

export interface CarSlot {
  id?: number;
  createdAt: Date;
  carId: number;
  carPartId: number;
  type: CarPartType;
  Car?: Car;
  CarPart?: CarPart;
}