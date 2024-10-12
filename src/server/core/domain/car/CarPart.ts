import { CarPartModel } from "./CarPartModel";

export interface CarPart {
  id: number;
  userId: string;
  model: CarPartModel;
  accelerationUpgrade: number;
  velocityUpgrade: number;
  steeringUpgrade: number;
  resistanceUpgrade: number;
}

