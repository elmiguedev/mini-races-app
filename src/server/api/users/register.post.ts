import { ActionProvider } from "../../core/providers/ActionProvider";

export default defineEventHandler(async (event) => {
  const action = ActionProvider.getInstance().registerUserAction;
  const body = await readBody(event)
  const user = await action.execute({
    email: body.email,
    password: body.password
  });
  return user;
})