import { defineEventHandler, readBody, createError } from "h3"
import { useActions } from "../../hooks/useActions";
import { setUserSession } from "#imports";

export default defineEventHandler(async (event) => {

  try {
    // 1. get body from request
    const body = await readBody(event)

    // 2. validate body
    if (!body) {
      return { error: "Request body is empty or undefined" };
    }

    const { email, password } = body;

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    // 3. creates register action
    const { registerUserAction } = useActions();
    const user = await registerUserAction.execute({
      email: body.email,
      password: body.password
    });

    // 4. creates session user
    const userData = {
      email: user.email,
      name: user.name,
      id: user.id
    };

    await setUserSession(event, {
      user: userData,
      loggedInAt: new Date(),
    });

    return { success: true, user };

  } catch (error) {
    console.error("Error handling signup request:", error);
    return createError({
      statusCode: 400,
      statusMessage: "Failed to process request",
    });
  }

})