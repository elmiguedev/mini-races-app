import { CarSlot } from "./CarSlot";

export interface Car {
  id: string;
  userId: string;
  slots: CarSlot[];
  color: string;
}