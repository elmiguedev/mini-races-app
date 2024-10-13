import { User } from "../user/User";
import { CarSlot } from "./CarSlot";

export interface Car {
  id?: number;
  createdAt: Date;
  userId: string;
  CarSlot?: CarSlot[];
  User?: User;
  color: string;
}