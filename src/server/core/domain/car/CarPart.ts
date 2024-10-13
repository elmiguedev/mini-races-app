import { CarPartModel } from "./CarPartModel";

export interface CarPart {
  id?: number | undefined;
  createdAt?: Date;
  userId: number;
  carPartModelId: number;
  accelerationUpgrade: number;
  velocityUpgrade: number;
  steeringUpgrade: number;
  resistanceUpgrade: number;
  CarPartModel?: CarPartModel;
}

