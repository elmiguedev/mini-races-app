import type { NitroApp } from "nitropack";
// @ts-ignore
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { initializeSocket } from "../socket";
import { Car } from "../../core/domain/user/Car";
import { Checkpoint } from "../../core/domain/Checkpoint";

const createCheckpoints = (): Checkpoint[] => {
  return [
    { x: 100, y: 500, width: 170, height: 20, id: 0 },
    { x: 400, y: 70, width: 20, height: 140, id: 1 },
    { x: 750, y: 300, width: 170, height: 20, id: 2 },
    { x: 500, y: 600, width: 140, height: 20, id: 3 },
    { x: 750, y: 800, width: 170, height: 20, id: 4 },
    { x: 500, y: 800, width: 20, height: 140, id: 5 }
  ]
}

const validateCheckpointOverlap = (checkpoints: Checkpoint[], car: Car) => {
  for (let i = 0; i < checkpoints.length; i++) {
    if (
      car.x >= checkpoints[i].x &&
      car.x <= checkpoints[i].x + checkpoints[i].width &&
      car.y >= checkpoints[i].y &&
      car.y <= checkpoints[i].y + checkpoints[i].height
    ) {
      const id = checkpoints[i].id;

      // si el car pasa por el mismo checkpoint que ya esta, no hace nada
      if (id === car.currentCheckpoint) {
        return;
      }

      // si el car pasa por un checkpoint inmediatamente superior, avanza
      if (car.currentCheckpoint + 1 === id) {
        car.currentCheckpoint = id;
        car.currentCheckpointTime = new Date().getTime();
        return;
      }

      // si el car pasa por un checkpoint inmediatamente inferior, retrocede
      if (car.currentCheckpoint - 1 === id && id > 0) {
        car.currentCheckpoint = id;
        car.currentCheckpointTime = new Date().getTime();
        return;
      }

      // si el car pasa por la meta, y venia con el ultimo check, avanza de lap
      if (id === 0 && car.currentCheckpoint === checkpoints.length - 1) {
        car.laps++;
        car.currentCheckpoint = 0;
        car.currentCheckpointTime = new Date().getTime();
        return;
      }

      if (id === 0 && car.currentCheckpoint === 1) {
        car.laps -= 1;
        car.currentCheckpoint = checkpoints.length - 1;
        car.currentCheckpointTime = new Date().getTime();
        return;
      }

      const position = getCheckpointPosition(checkpoints, car.currentCheckpoint);
      car.x = position.x;
      car.y = position.y;
    }
  }
}

const getCheckpointPosition = (checkpoints: Checkpoint[], id: number) => {
  return {
    x: checkpoints[id].x,
    y: checkpoints[id].y
  }
}

const validatePositions = (cars: Car[]) => {
  cars.sort((a, b) => {
    return (a.laps - b.laps === 0 ?
      ((a.currentCheckpoint - b.currentCheckpoint) === 0
        ? b.currentCheckpointTime - a.currentCheckpointTime
        : a.currentCheckpoint - b.currentCheckpoint)
      : a.laps - b.laps);
  });
  cars.forEach((car, index) => {
    car.racePosition = index;
  });
}


export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  // const io = new Server();
  const httpServer = nitroApp.h3App;
  const io = initializeSocket(httpServer);

  io.bind(engine);

  // TODO LO QUE ESTE ACA ABAJO

  const cars: Car[] = [];
  const checkpoints: Checkpoint[] = createCheckpoints();

  // 1. creamos los checkpoinst


  // 2. inicializamos el socket
  io.on("connection", (socket) => {
    console.log(">> cliente conectado", socket.id);

    // 1. crea el car
    const randomColor = Math.floor(Math.random() * 16777215);
    const x = 150 + (cars.length * 40);
    const car: Car = {
      id: socket.id,
      x: x,
      y: 430,
      racePosition: 0,
      laps: 0,
      currentCheckpoint: 0,
      color: randomColor,
      currentCheckpointTime: 0
    };
    cars.push(car);

    // 2. manda el status al car nuevo
    socket.emit("cars_status", cars);

    // 3. avisa al resto que un auto se conecto
    io.emit("car_connected", car);

    // 4. cuando se val socket al carajo, avisa
    socket.on("disconnect", () => {
      console.log(">> cliente desconectado", socket.id);
      cars.forEach((car, index) => {
        if (car.id === socket.id) {
          cars.splice(index, 1);
        }
      });
      io.emit("car_disconnected", socket.id);
    });

    // 5. cuando el carajo mande el status, actualiza
    socket.on("car_move", (data) => {
      const car = cars.find((c) => c.id === socket.id);
      if (car) {
        car.x = data.x;
        car.y = data.y;

        validateCheckpointOverlap(checkpoints, car);
        validatePositions(cars);
      }
      io.emit("car_status", car);
    });



  });

  // Y TODO LO QUE ESTE ACA ARRIBA ES EL TEMA DE LOS MENSAJES DEL SOCKET
  // QUE EN ALGUN MOMENTO ESTO SE TIENE QUE IR A HANDLERS APARTE

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});