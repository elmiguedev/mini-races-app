import { defineEventHandler, readBody, createError } from "h3"
import { useActions } from "../../hooks/useActions";

export default defineEventHandler(async (event) => {
  // Validar que el auto sea tuyo
  try {
    const body = await readBody(event);
    const { setCarPartAction } = useActions();
    const partSlot = await setCarPartAction.execute(body);
    return partSlot;
  } catch (error) {
    console.error("Error handling signup request:", error);
    return createError({
      statusCode: 400,
      statusMessage: "Failed to process request",
    });
  }
})