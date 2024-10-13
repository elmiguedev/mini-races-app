import { defineEventHandler, readBody, createError } from "h3"
import { useActions } from "../../../../hooks/useActions";
import { getRouterParam, getUserSession } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const carPartModelId = getRouterParam(event, "id");
    const { user } = await getUserSession(event);

    if (!user || !carPartModelId) {
      return createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const { buyPartModelAction } = useActions();
    const carPart = await buyPartModelAction.execute({
      // @ts-ignore
      userId: user.id,
      carPartModelId: Number(carPartModelId)
    });
    return carPart;
  } catch (error) {
    console.error("Error handling signup request:", error);
    return createError({
      statusCode: 400,
      statusMessage: "Failed to process request",
    });
  }
})