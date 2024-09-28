import type { NitroApp } from "nitropack";
// @ts-ignore
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { initializeSocket } from "../socket";
import { Car } from "../../core/domain/user/Car";
import { Checkpoint } from "../../core/domain/Checkpoint";
import { Body, BoxShape, Vec2, Vec3, World } from "planck";

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

const validateCheckpointOverlap = (checkpoints: Checkpoint[], car: Car, race: any, callback: any) => {
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

        if (car.laps >= race.laps) {
          car.status = 'finished';
          race.podium.push(car);
          if (race.status === "pending") {
            race.status = "finished"
          }
        }

        // ACA TENEMOS QUE PONER LA CONDICION DE CORTE
        if (race.podium.length === race.cars.length) {
          callback();
        }


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

const createCar = (id: string, x: number, y: number, world: World) => {
  const randomColor = Math.floor(Math.random() * 16777215);
  const carState = {
    id: id,
    x: x,
    y: 430,
    racePosition: 0,
    laps: 0,
    currentCheckpoint: 0,
    color: randomColor,
    currentCheckpointTime: 0,
    status: "pending"
  };

  const carBody = world.createBody({
    type: 'dynamic',
    position: Vec2(x, y),
    angle: 0,
    linearDamping: 0.5
  });

  carBody.createFixture({
    shape: new BoxShape(32, 32),
  });

  return {
    body: carBody,
    state: carState
  }

}

const moveCar = (car: any, controls: any) => {
  const { up, left, right } = controls;
  const carBody: Body = car.body;
  if (up) {
    const cosx = Math.cos(carBody.getAngle());
    const sinx = Math.sin(carBody.getAngle());
    const acc = 26;
    carBody.applyLinearImpulse(
      Vec2(cosx * acc, sinx * acc),
      carBody.getWorldCenter(),
    )
  }

  if (left) {
    const currentAngle = carBody.getAngle();
    carBody.setAngle(currentAngle - 0.05);
  }

  if (right) {
    const currentAngle = carBody.getAngle();
    carBody.setAngle(currentAngle + 0.05);
  }
}

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  // const io = new Server();
  const httpServer = nitroApp.h3App;
  const io = initializeSocket(httpServer);

  io.bind(engine);

  // TODO LO QUE ESTE ACA ABAJO

  // const cars: Car[] = [];
  const checkpoints: Checkpoint[] = createCheckpoints();
  const race: any = {
    laps: 1,
    podium: [],
    status: "pending",
    cars: [],
    carsLength: 1
  }

  const world: World = new World();

  // 1. creamos los checkpoinst


  // 2. inicializamos el socket
  io.on("connection", (socket) => {
    console.log(">> cliente conectado", socket.id);

    // 1. crea el car
    const x = 150 + (race.cars.length * 40);
    const car = createCar(socket.id, x, 430, world);
    race.cars.push(car);

    if (race.cars.length >= race.carsLength) {
      io.emit("race_countdown");
      setTimeout(() => {
        race.status = "playing";
        race.cars.forEach((car: any) => {
          car.status = "playing";
          io.emit("car_status", car.state);
        });
        io.emit("race_start");
      }, 3000);
    }

    // 2. manda el status al car nuevo
    socket.emit("cars_status", race.cars.map((c: any) => c.state));

    // 3. avisa al resto que un auto se conecto
    io.emit("car_connected", car.state);

    // 4. cuando se val socket al carajo, avisa
    socket.on("disconnect", () => {
      console.log(">> cliente desconectado", socket.id);
      race.cars.forEach((car: any, index: number) => {
        if (car.id === socket.id) {
          race.cars.splice(index, 1);
        }
      });
      io.emit("car_disconnected", socket.id);
    });

    // 5. cuando el carajo mande el status, actualiza
    socket.on("car_move", (data) => {
      const car = race.cars.find((c: Car) => c.id === socket.id);
      if (car) {

        car.x = data.x;
        car.y = data.y;

        validateCheckpointOverlap(checkpoints, car, race, () => {
          console.log(">> race finished");
          io.emit("race_finished", race.podium);
          race.laps = 1;
          race.cars = [];
          race.podium = [];
          race.status = "pending";
          race.carsLength = 2;
        });
        validatePositions(race.cars);
      }
      io.emit("car_status", car);
    });

    socket.on("car_controls", (data) => {
      const car = race.cars.find((c: any) => c.state.id === socket.id);
      moveCar(car, data);
    });

    const tickTime = 1000 / 60;
    setInterval(() => {
      // validaciones
      if (!race) return;
      if (!race.cars) return;

      // step del mundo
      world.step(1 / 60);

      // actualiza los estados y manda el status
      race.cars.forEach((car: any) => {
        const carBody = car.body;
        const carState = car.state;

        carState.x = carBody.getPosition().x;
        carState.y = carBody.getPosition().y;
        carState.angle = carBody.getAngle() * 180 / Math.PI;

        io.emit("car_status", carState);
      })

      // manda el status

    }, tickTime);


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