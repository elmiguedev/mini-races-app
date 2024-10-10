import { CarPartType } from "./CarPartType";

export interface CarPartModel {
  id?: string;
  name: string;
  type: CarPartType;
  acceleration: number;
  velocity: number;
  steering: number;
  resistance: number;
}