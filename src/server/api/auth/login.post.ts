import { defineEventHandler, readBody, createError } from "h3"
import { useActions } from "../../hooks/useActions";
import { setUserSession } from "#imports";
import { LoginRequest } from "../../../model/auth/LoginRequest";

export default defineEventHandler(async (event) => {
  try {

    // 1. get body request
    const body = await readBody<LoginRequest>(event);

    // 2. validate body
    if (!body) {
      return createError({
        statusCode: 400,
        statusMessage: "email and password are required",
      });
    }

    // 3. creates login action
    const { loginAction } = useActions();
    const user = await loginAction.execute({
      email: body.email,
      password: body.password
    });

    // 4. validate user response
    if (!user) {
      return createError({
        statusCode: 401,
        statusMessage: "email and password are invalid",
      });
    }

    // 5. creates session user
    await setUserSession(event, {
      user: {
        email: user.email,
        name: user.name,
        id: user.id
      },
      loggedInAt: new Date(),
    });

    return user;

  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Failed to process request",
    });
  }

})