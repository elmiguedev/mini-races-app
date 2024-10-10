import { CarPartModel } from "./CarPartModel";

export interface CarPart {
  id: string;
  userId: string;
  model: CarPartModel;
  accelerationUpgrade: number;
  velocityUpgrade: number;
  steeringUpgrade: number;
  resistanceUpgrade: number;
}

