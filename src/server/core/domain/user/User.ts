export interface User {
  id?: number
  createdAt: Date;
  name: string
  email: string
  password?: string;
  money: number;
}