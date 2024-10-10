import { CarPartType } from "./CarPartType";

export interface CarSlot {
  carId: string;
  carPartId: string;
  type: CarPartType;
}