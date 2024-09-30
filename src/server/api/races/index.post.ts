import { defineEventHandler, readBody, createError } from "h3"
import { useActions } from "../../hooks/useActions";

export default defineEventHandler(async (event) => {
  try {
    const { user } = await getUserSession(event);
    if (!user) {
      return createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }
    console.log(">> el user session", user)
    const { createRaceAction } = useActions();
    const race = await createRaceAction.execute({
      // @ts-ignore
      id: user.id,
      // @ts-ignore
      name: user.name
    });
    return race;
  } catch (error) {
    console.error("Error handling signup request:", error);
    return createError({
      statusCode: 400,
      statusMessage: "Failed to process request",
    });
  }
})