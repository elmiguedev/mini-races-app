import { User } from "./User";

export interface Race {
  id: string;
  createdAt: Date;
  users?: User[];
}