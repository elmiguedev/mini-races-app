import { RepositoryProvider } from "./core/providers/RepositoryProvider";

const config = useRuntimeConfig();
export default async () => {
  try {
    await RepositoryProvider.getInstance().init();
    console.log(" >> db connected ");
  } catch (err) {
    console.log(" >> db error ", err);
  }
};