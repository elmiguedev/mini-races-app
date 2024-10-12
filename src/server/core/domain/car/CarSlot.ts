import { CarPartType } from "./CarPartType";

export interface CarSlot {
  carId: number;
  carPartId: string;
  type: CarPartType;
}