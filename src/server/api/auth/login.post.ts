import { defineEventHandler, readBody, createError, setResponseStatus } from "h3"
import { setUserSession } from "../../../../node_modules/.pnpm/nuxt-auth-utils@0.3.9_rollup@4.21.3/node_modules/nuxt-auth-utils/dist/runtime/server/utils/session";
import { useActions } from "../../hooks/useActions";
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body) {
      console.error("Request body is empty or undefined");
      return createError({
        statusCode: 400,
        statusMessage: "Request body is empty or undefined",
      });
    }

    const { email, password } = body;

    if (!email || !password) {
      console.error("email or password missing");
      return createError({
        statusCode: 400,
        statusMessage: "Username and password are required",
      });
    }

    const { loginAction } = useActions();
    const user = await loginAction.execute({
      email: body.email,
      password: body.password
    });

    if (!user) {
      setResponseStatus(event, 401);
      return {
        message: "user not found"
      }
    } else {
      const userData = {
        email: user?.email,
        name: user?.name,
        id: user?.id
      };

      await setUserSession(event, {
        user: userData,
        loggedInAt: new Date(),
      });

      return { success: true, user };
    }

  } catch (error) {
    console.error("Error handling login request:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Failed to process request",
    });
  }

})