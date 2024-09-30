import { defineEventHandler } from "h3"
import { useActions } from "../../hooks/useActions";

export default defineEventHandler(async (event) => {
  const { getRacesAction } = useActions();
  const races = await getRacesAction.execute();
  return races;
})