import { CarSlot } from "./CarSlot";

export interface Car {
  id: number;
  userId: string;
  slots: CarSlot[];
  color: string;
}