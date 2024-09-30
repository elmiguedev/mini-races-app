import { User } from "./User";

export interface Race {
  id: string;
  createdAd: Date;
  users?: User[];
}