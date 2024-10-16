import { defineNitroPlugin } from "#imports";
import { BuyPartModelAction } from "../core/actions/car/BuyPartModelAction";
import { CreatePartModelAction } from "../core/actions/car/CreatePartModelAction";
import { GetPartModelsAction } from "../core/actions/car/GetPartModelsAction";
import { GetUserCarPartsAction } from "../core/actions/car/GetUserCarPartsAction";
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
import { PrismaCarRepository } from "../core/infrastructure/repositories/car/PrismaCarRepository";
import { InMemoryRaceRepository } from "../core/infrastructure/repositories/races/InMemoryRaceRepository";
import { PrimsaUserRepository } from "../core/infrastructure/repositories/user/PrismaUserRepository";
import { Actions } from "../hooks/useActions";
import { DisconnectHandler } from "../sockets/handlers/DisconnectHandler";
import { JoinRaceHandler } from "../sockets/handlers/JoinRaceHandler";
import { RaceStatusHandler } from "../sockets/handlers/RaceStatusHandler";
import { SocketServer } from "../sockets/SocketServer";

export default defineNitroPlugin(async (nitroApp: any) => {
  // creo los servicios
  const cache = new InMemoryMiniRacesCache();
  const socketServer = new SocketServer(nitroApp);

  // creo los servicios
  const userRepository = new PrimsaUserRepository();
  const carRepository = new PrismaCarRepository();
  const inMemoryRaceRepository = new InMemoryRaceRepository(cache);

  // creo las acciones
  const actions: Actions = {
    registerUserAction: new RegisterUserAction(userRepository),
    getUsersAction: new GetUsersAction(userRepository),
    getUserAction: new GetUserAction(userRepository),
    loginAction: new LoginAction(userRepository),
    createRaceAction: new CreateRaceAction(inMemoryRaceRepository),
    getRacesAction: new GetRacesAction(inMemoryRaceRepository),
    getRaceAction: new GetRaceAction(inMemoryRaceRepository),
    joinRaceAction: new JoinRaceAction(inMemoryRaceRepository, userRepository),
    leaveRaceAction: new LeaveRaceAction(inMemoryRaceRepository),
    getRaceByUser: new GetRaceByUserAction(inMemoryRaceRepository),
    getPartModelsAction: new GetPartModelsAction(carRepository),
    createPartModelAction: new CreatePartModelAction(carRepository),
    buyPartModelAction: new BuyPartModelAction(carRepository, userRepository),
    getUserCarPartsAction: new GetUserCarPartsAction(carRepository),
  };

  // inyecto las acciones en el server
  nitroApp.actions = actions;

  // creo los handlers de sockets
  socketServer.addSocketHandler("race_join", new JoinRaceHandler(socketServer, actions.joinRaceAction));
  socketServer.addSocketHandler("disconnect", new DisconnectHandler(socketServer, actions.leaveRaceAction));
  socketServer.addSocketHandler("race_status", new RaceStatusHandler(socketServer, actions.getRaceByUser));

  // inicializo los servicios
  socketServer.init();

  // log info
  console.log(">> Services Plugin loaded");
});