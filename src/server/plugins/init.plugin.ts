import { defineNitroPlugin } from "../../../node_modules/.pnpm/nitropack@2.9.7/node_modules/nitropack/dist/runtime"
import { CreateRaceAction } from "../core/actions/race/CreateRaceAction";
import { GetRacesAction } from "../core/actions/race/GetRacesAction";
import { GetUserAction } from "../core/actions/users/GetUserAction";
import { GetUsersAction } from "../core/actions/users/GetUsersAction";
import { LoginAction } from "../core/actions/users/LoginAction";
import { RegisterUserAction } from "../core/actions/users/RegisterUserAction";
import { InMemoryMiniRacesCache } from "../core/infrastructure/db/InMemoryMiniRacesCache";
import { MiniRacesDB } from "../core/infrastructure/db/MiniRacesDB";
import { InMemoryRaceRepository } from "../core/infrastructure/repositories/races/InMemoryRaceRepository";
import { PgUserRepository } from "../core/infrastructure/repositories/user/PgUserRepository";

export default defineNitroPlugin(async (nitroApp: any) => {
  // creo los servicios
  const db = new MiniRacesDB();
  const cache = new InMemoryMiniRacesCache();

  // creo los servicios
  const userRepository = new PgUserRepository(db);
  const inMemoryRaceRepository = new InMemoryRaceRepository(cache);

  // creo las acciones
  const actions = {
    registerUserAction: new RegisterUserAction(userRepository),
    getUsersAction: new GetUsersAction(userRepository),
    getUserAction: new GetUserAction(userRepository),
    loginAction: new LoginAction(userRepository),
    createRaceAction: new CreateRaceAction(inMemoryRaceRepository),
    getRacesAction: new GetRacesAction(inMemoryRaceRepository),
  };

  // inyecto las acciones en el server
  nitroApp.actions = actions;

  // inicializo los servicios
  await db.init();

  // log info
  console.log(">> Plugins loaded");
});