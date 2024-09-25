import { ActionProvider } from "../../core/providers/ActionProvider";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Retrieve request body
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

    const action = ActionProvider.getInstance().loginAction;
    const user = await action.execute({
      email: body.email,
      password: body.password
    });


    // For security reasons, do not specify if username or password is incorrect
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