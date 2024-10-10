import { defineEventHandler } from "h3"
import { useActions } from "../../hooks/useActions";

export default defineEventHandler(async (event) => {
  const { getPartModelsAction } = useActions();
  const models = await getPartModelsAction.execute()
  return models;
})