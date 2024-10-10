import { defineEventHandler, readBody, createError } from "h3"
import { useActions } from "../../hooks/useActions";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { createPartModelAction } = useActions();
    const partModel = await createPartModelAction.execute(body);
    return partModel;
  } catch (error) {
    console.error("Error handling signup request:", error);
    return createError({
      statusCode: 400,
      statusMessage: "Failed to process request",
    });
  }
})