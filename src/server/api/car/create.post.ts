import { defineEventHandler, readBody, createError } from "h3"
import { useActions } from "../../hooks/useActions";
import { getUserSession } from "#imports";

export default defineEventHandler(async (event) => {
  // Validar que el auto sea tuyo
  try {
    const { createCarAction } = useActions();
    const { user } = await getUserSession(event);
    const car = await createCarAction.execute({
      // @ts-ignore
      userId: user.id
    });
    return car;
  } catch (error) {
    console.error("Error handling signup request:", error);
    return createError({
      statusCode: 400,
      statusMessage: "Failed to process request",
    });
  }
})