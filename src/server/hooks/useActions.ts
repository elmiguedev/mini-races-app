import { CreatePartModelAction } from "../core/actions/car/CreatePartModelAction";
import { GetPartModelsAction } from "../core/actions/car/GetPartModelsAction";
import { CreateRaceAction } from "../core/actions/race/CreateRaceAction";
import { GetRaceAction } from "../core/actions/race/GetRaceAction";
import { GetRaceByUserAction } from "../core/actions/race/GetRaceByUserAction";
import { GetRacesAction } from "../core/actions/race/GetRacesAction";
import { JoinRaceAction } from "../core/actions/race/JoinRaceAction";
import { LeaveRaceAction } from "../core/actions/race/LeaveRaceAction";
import { GetUserAction } from "../core/actions/users/GetUserAction";
import { GetUsersAction } from "../core/actions/users/GetUsersAction";
import { LoginAction } from "../core/actions/users/LoginAction";
import { RegisterUserAction } from "../core/actions/users/RegisterUserAction";

export interface Actions {
  registerUserAction: RegisterUserAction;
  getUsersAction: GetUsersAction;
  getUserAction: GetUserAction;
  loginAction: LoginAction;
  createRaceAction: CreateRaceAction;
  getRacesAction: GetRacesAction;
  getRaceAction: GetRaceAction;
  joinRaceAction: JoinRaceAction;
  leaveRaceAction: LeaveRaceAction;
  getRaceByUser: GetRaceByUserAction;
  getPartModelsAction: GetPartModelsAction,
  createPartModelAction: CreatePartModelAction
}

export function useActions(): Actions {
  // @ts-ignore
  const nitroApp = useNitroApp()
  // @ts-ignore
  return nitroApp.actions;
}