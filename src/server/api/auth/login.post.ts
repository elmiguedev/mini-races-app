import { ActionProvider } from "../../core/providers/ActionProvider";

export default defineEventHandler(async (event) => {
  const action = ActionProvider.getInstance().loginAction;
  const body = await readBody(event)
  console.log(">> new login", body);
  const user = await action.execute({
    email: body.email,
    password: body.password
  });

  if (!user) {
    setResponseStatus(event, 401);
    return {
      message: "user not found"
    }
  }

  return user;
})