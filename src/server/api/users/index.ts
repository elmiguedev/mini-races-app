import { ActionProvider } from "../../core/providers/ActionProvider";

export default defineEventHandler(async (event) => {
  const action = ActionProvider.getInstance().getUsersAction;
  const users = await action.execute();
  return {
    message: users
  }
})