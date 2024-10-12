// @ts-ignore
import { Server as Engine } from "engine.io";
import { Server, Socket } from "socket.io";
import { createEvent } from 'h3'
import { defineEventHandler, getUserSession } from "#imports";

export class SocketServer {
  private serverSocket: Server;
  private nitroApp: any;
  private clientHandlers: Record<string, any> = {};
  private broadcastHandlers: Record<string, any> = {};

  public sockets: Record<string, any> = {};

  constructor(nitroApp: any) {
    this.nitroApp = nitroApp;
    this.serverSocket = new Server(nitroApp.h3App);
  }

  public init() {
    const engine = new Engine();
    this.serverSocket.bind(engine);
    this.createClientEndpoint(engine, this.nitroApp);

    this.serverSocket.on("connection", (socket) => {

      console.log(">> cliente conectado", socket.id);

      this.authenticateUser(socket).then((user) => {
        if (user) {
          this.sockets[socket.id] = {
            socket,
            user
          };
          console.log(">> cliente confirmado", user);
          socket.emit("confirm_connection", user);
        } else {
          socket.disconnect(true);
        }
      });

      this.connectClientHandlers(socket);


    })
  }

  public emitToRoom(room: string, event: string, data: any) {
    this.serverSocket.to(room).emit(event, data);
  }

  public addSocketHandler(message: string, handler: any) {
    this.clientHandlers[message] = handler;
    // this.serverSocket.on(message, (data: any) => {
    //   handler(data);
    // });
  }

  public addBroadcastHandler(message: string, handler: any) {
    this.broadcastHandlers[message] = handler;
  }

  private connectClientHandlers(socket: Socket) {
    for (const message in this.clientHandlers) {
      socket.on(message, (data: any) => {
        this.clientHandlers[message].handle(socket, data);
      });
    }
  }

  private connectBroadcastHandlers() {
    for (const message in this.broadcastHandlers) {
      this.serverSocket.on(message, (data: any) => {
        this.broadcastHandlers[message](data);
      });
    }
  }
  // // 2. inicializamos el socket
  // io.on("connection", (socket) => {
  //   console.log(">> cliente conectado", socket.id);

  //   // 1. crea el car
  //   const x = 150 + (race.cars.length * 40);
  //   const car = createCar(socket.id, x, 430, world);
  //   race.cars.push(car);

  //   if (race.cars.length >= race.carsLength) {
  //     io.emit("race_countdown");
  //     setTimeout(() => {
  //       race.status = "playing";
  //       race.cars.forEach((car: any) => {
  //         car.status = "playing";
  //         io.emit("car_status", car.state);
  //       });
  //       io.emit("race_start");
  //     }, 3000);
  //   }

  //   // 2. manda el status al car nuevo
  //   socket.emit("cars_status", race.cars.map((c: any) => c.state));

  //   // 3. avisa al resto que un auto se conecto
  //   io.emit("car_connected", car.state);

  //   // 4. cuando se val socket al carajo, avisa
  //   socket.on("disconnect", () => {
  //     console.log(">> cliente desconectado", socket.id);
  //     race.cars.forEach((car: any, index: number) => {
  //       if (car.id === socket.id) {
  //         race.cars.splice(index, 1);
  //       }
  //     });
  //     io.emit("car_disconnected", socket.id);
  //   });

  //   // 5. cuando el carajo mande el status, actualiza
  //   // socket.on("car_move", (data) => {
  //   //   const car = race.cars.find((c: Car) => c.id === socket.id);
  //   //   if (car) {

  //   //     car.x = data.x;
  //   //     car.y = data.y;

  //   //     validateCheckpointOverlap(checkpoints, car, race, () => {
  //   //       console.log(">> race finished");
  //   //       io.emit("race_finished", race.podium);
  //   //       race.laps = 1;
  //   //       race.cars = [];
  //   //       race.podium = [];
  //   //       race.status = "pending";
  //   //       race.carsLength = 2;
  //   //     });
  //   //     validatePositions(race.cars);
  //   //   }
  //   //   io.emit("car_status", car);
  //   // });

  //   socket.on("car_controls", (data) => {
  //     const car = race.cars.find((c: any) => c.state.id === socket.id);
  //     moveCar(car, data);
  //   });

  //   const tickTime = 1000 / 60;
  //   setInterval(() => {
  //     // validaciones
  //     if (!race) return;
  //     if (!race.cars) return;

  //     // step del mundo
  //     world.step(1 / 60);

  //     // actualiza los estados y manda el status
  //     race.cars.forEach((car: any) => {
  //       const carBody = car.body;
  //       const carState = car.state;

  //       carState.x = carBody.getPosition().x;
  //       carState.y = carBody.getPosition().y;
  //       carState.angle = carBody.getAngle() * 180 / Math.PI;

  //       io.emit("car_status", carState);
  //     })

  //     // manda el status

  //   }, tickTime);


  // });

  private createClientEndpoint(engine: Engine, nitroApp: any) {
    nitroApp.router.use("/socket.io/", defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          // @ts-ignore
          const nodeContext = peer.ctx.node;
          const req = nodeContext.req;

          engine.prepare(req);

          const rawSocket = nodeContext.req.socket;
          const websocket = nodeContext.ws;

          engine.onWebSocket(req, rawSocket, websocket);
        }
      }
    }));
  }

  private async authenticateUser(socket: Socket) {
    try {
      // Obtener el token de los parámetros de conexión del socket
      const cookie = socket.handshake.headers.cookie as string;
      if (!cookie) return null;
      const event = createEvent(socket.request, {} as any);
      // Obtener el usuario de la sesión usando el evento simulado
      const { user } = await getUserSession(event);
      return user;
    } catch (error) {
      console.error('Error en la autenticación del socket:', error);
      return null;
    }
  }

}