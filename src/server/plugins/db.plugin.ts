import { RepositoryProvider } from "../core/providers/RepositoryProvider";

export default defineNitroPlugin(async (nitroApp) => {
  try {
    await RepositoryProvider.getInstance().init();
    console.log(">> DB initialized")
  } catch (error) {

  }
});