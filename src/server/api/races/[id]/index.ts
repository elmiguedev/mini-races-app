import { defineEventHandler } from "h3"
import { useActions } from "../../../hooks/useActions";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { getRaceAction } = useActions();
  const race = await getRaceAction.execute(id);
  return race;
})