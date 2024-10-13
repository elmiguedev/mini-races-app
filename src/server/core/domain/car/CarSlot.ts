import { Car } from "./Car";
import { CarPartType } from "./CarPartType";

export interface CarSlot {
  id?: number;
  createdAt: Date;
  carId: number;
  carPartId: string;
  type: CarPartType;
  Car?: Car;
}