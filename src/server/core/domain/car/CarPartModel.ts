import { CarPartType } from "./CarPartType";

export interface CarPartModel {
  id?: number;
  name: string;
  type: CarPartType;
  acceleration: number;
  velocity: number;
  steering: number;
  resistance: number;
}