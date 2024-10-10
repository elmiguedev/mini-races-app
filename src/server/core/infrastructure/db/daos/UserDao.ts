import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../domain/user/User";

@Entity("user")
export class UserDao implements User {
  @PrimaryGeneratedColumn()
  id?: string | undefined;
  @Column()
  name: string = "";
  @Column()
  email: string = "";
  @Column()
  password: string = "";
}