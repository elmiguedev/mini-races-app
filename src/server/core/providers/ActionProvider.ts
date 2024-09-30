import { CreateRaceAction } from "../actions/race/CreateRaceAction";
import { GetUserAction } from "../actions/users/GetUserAction";
import { GetUsersAction } from "../actions/users/GetUsersAction";
import { LoginAction } from "../actions/users/LoginAction";
import { RegisterUserAction } from "../actions/users/RegisterUserAction";
import { RepositoryProvider } from "./RepositoryProvider";

export class ActionProvider {

  // actions
  public registerUserAction: RegisterUserAction;
  public getUsersAction: GetUsersAction;
  public getUserAction: GetUserAction;
  public loginAction: LoginAction;
  public createRace: CreateRaceAction;

  // singleton
  private static instance: ActionProvider;
  public static getInstance() {
    if (!ActionProvider.instance) {
      ActionProvider.instance = new ActionProvider();
    }
    return ActionProvider.instance;
  }

  // intialize repositories
  private constructor() {
    const userRepository = RepositoryProvider.getInstance().userRepository;
    this.registerUserAction = new RegisterUserAction(userRepository);
    this.getUsersAction = new GetUsersAction(userRepository);
    this.getUserAction = new GetUserAction(userRepository);
    this.loginAction = new LoginAction(userRepository);
    this.createRace = new CreateRaceAction();
  }
}