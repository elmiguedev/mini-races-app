import { defineEventHandler, getRouterParam } from "h3"
import { useActions } from "../../hooks/useActions";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    return {
      message: "no hay id"
    }
  }
  const { getUserAction } = useActions();
  const user = await getUserAction.execute(id);
  return user;
})