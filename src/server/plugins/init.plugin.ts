import { defineNitroPlugin } from "../../../node_modules/.pnpm/nitropack@2.9.7/node_modules/nitropack/dist/runtime"
import { CreateRaceAction } from "../core/actions/race/CreateRaceAction";
import { GetUserAction } from "../core/actions/users/GetUserAction";
import { GetUsersAction } from "../core/actions/users/GetUsersAction";
import { LoginAction } from "../core/actions/users/LoginAction";
import { RegisterUserAction } from "../core/actions/users/RegisterUserAction";
import { MiniRacesDB } from "../core/infrastructure/db/MiniRacesDB";
import { PgUserRepository } from "../core/infrastructure/repositories/user/PgUserRepository";

export default defineNitroPlugin(async (nitroApp: any) => {
  // creo los servicios
  const db = new MiniRacesDB();

  // creo los servicios
  const userRepository = new PgUserRepository(db);

  // creo las acciones
  const actions = {
    registerUserAction: new RegisterUserAction(userRepository),
    getUsersAction: new GetUsersAction(userRepository),
    getUserAction: new GetUserAction(userRepository),
    loginAction: new LoginAction(userRepository),
    createRace: new CreateRaceAction(),
  };

  // inyecto las acciones en el server
  nitroApp.actions = actions;

  // inicializo los servicios
  await db.init();

  // log info
  console.log(">> Plugins loaded");
});