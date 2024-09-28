import { RepositoryProvider } from "./core/providers/RepositoryProvider";

const config = useRuntimeConfig();
export default async () => {
  try {
    console.log()
    console.log()
    console.log(">> serveeeer")
    console.log()
    console.log()
    await RepositoryProvider.getInstance().init();
    console.log(" >> db connected ");
  } catch (err) {
    console.log(" >> db error ", err);
  }
};