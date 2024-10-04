import { defineNitroPlugin } from "../../../node_modules/.pnpm/nitropack@2.9.7/node_modules/nitropack/dist/runtime"
import { CreateRaceAction } from "../core/actions/race/CreateRaceAction";
import { GetRaceAction } from "../core/actions/race/GetRaceAction";
import { GetRaceByUserAction } from "../core/actions/race/GetRaceByUserAction";
import { GetRacesAction } from "../core/actions/race/GetRacesAction";
import { JoinRaceAction } from "../core/actions/race/JoinRaceAction";
import { LeaveRaceAction } from "../core/actions/race/LeaveRaceAction";
import { GetUserAction } from "../core/actions/users/GetUserAction";
import { GetUsersAction } from "../core/actions/users/GetUsersAction";
import { LoginAction } from "../core/actions/users/LoginAction";
import { RegisterUserAction } from "../core/actions/users/RegisterUserAction";
import { InMemoryMiniRacesCache } from "../core/infrastructure/db/InMemoryMiniRacesCache";
import { MiniRacesDB } from "../core/infrastructure/db/MiniRacesDB";
import { InMemoryRaceRepository } from "../core/infrastructure/repositories/races/InMemoryRaceRepository";
import { PgUserRepository } from "../core/infrastructure/repositories/user/PgUserRepository";
import { DisconnectHandler } from "../sockets/handlers/DisconnectHandler";
import { JoinRaceHandler } from "../sockets/handlers/JoinRaceHandler";
import { RaceStatusHandler } from "../sockets/handlers/RaceStatusHandler";
import { SocketServer } from "../sockets/SocketServer";

export default defineNitroPlugin(async (nitroApp: any) => {
  // creo los servicios
  const db = new MiniRacesDB();
  const cache = new InMemoryMiniRacesCache();
  const socketServer = new SocketServer(nitroApp);

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
    getRaceAction: new GetRaceAction(inMemoryRaceRepository),
    joinRaceAction: new JoinRaceAction(inMemoryRaceRepository, userRepository),
    leaveRaceAction: new LeaveRaceAction(inMemoryRaceRepository),
    getRaceByUser: new GetRaceByUserAction(inMemoryRaceRepository)
  };

  // inyecto las acciones en el server
  nitroApp.actions = actions;

  // creo los handlers de sockets
  socketServer.addSocketHandler("race_join", new JoinRaceHandler(socketServer, actions.joinRaceAction));
  socketServer.addSocketHandler("disconnect", new DisconnectHandler(socketServer, actions.leaveRaceAction));
  socketServer.addSocketHandler("race_status", new RaceStatusHandler(socketServer, actions.getRaceByUser));

  // inicializo los servicios
  await db.init();
  socketServer.init();

  // log info
  console.log(">> Services Plugin loaded");
});