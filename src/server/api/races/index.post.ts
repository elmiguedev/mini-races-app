import { defineEventHandler, readBody, createError } from "h3"
import { useActions } from "../../hooks/useActions";

export default defineEventHandler(async (event) => {
  try {
    const { createRaceAction } = useActions();
    const race = await createRaceAction.execute();
    return race;
  } catch (error) {
    console.error("Error handling signup request:", error);
    return createError({
      statusCode: 400,
      statusMessage: "Failed to process request",
    });
  }
})