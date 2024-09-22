import { GetUsersAction } from "../actions/users/GetUsersAction";
import { RegisterUserAction } from "../actions/users/RegisterUserAction";
import { RepositoryProvider } from "./RepositoryProvider";

export class ActionProvider {

  // actions
  public registerUserAction: RegisterUserAction;
  public getUsersAction: GetUsersAction;

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
  }
}