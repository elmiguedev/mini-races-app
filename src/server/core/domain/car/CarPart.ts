import { CarPartModel } from "./CarPartModel";

export interface CarPart {
  id?: number;
  createdAt: Date;
  userId: string;
  carPartModelId: number;
  accelerationUpgrade: number;
  velocityUpgrade: number;
  steeringUpgrade: number;
  resistanceUpgrade: number;
}

