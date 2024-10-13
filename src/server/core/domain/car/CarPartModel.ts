import { CarPartType } from "./CarPartType";

export interface CarPartModel {
  id?: number;
  createdAt: Date;
  name: string;
  type: CarPartType;
  acceleration: number;
  velocity: number;
  steering: number;
  resistance: number;
}