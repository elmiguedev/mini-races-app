import { defineEventHandler } from "h3"
import { useActions } from "../../hooks/useActions";
import { createError, getUserSession } from "#imports"

export default defineEventHandler(async (event) => {
  const { getCarByUserIdAction } = useActions();
  const { user } = await getUserSession(event);
  if (!user) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  // @ts-ignore
  const cars = await getCarByUserIdAction.execute(user.id)
  return cars;
})