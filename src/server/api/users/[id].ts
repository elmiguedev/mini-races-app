import { ActionProvider } from "../../core/providers/ActionProvider";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    return {
      message: "no hay id"
    }
  }
  const action = ActionProvider.getInstance().getUserAction;
  const user = await action.execute(id);
  return user;
})