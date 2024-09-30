import { defineEventHandler } from "h3"
import { useActions } from "../../hooks/useActions";

export default defineEventHandler(async (event) => {
  const { getUsersAction } = useActions();
  const users = await getUsersAction.execute();
  return {
    message: users
  }
})