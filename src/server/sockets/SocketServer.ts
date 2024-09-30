// @ts-ignore
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";

export class SocketServer {
  private serverSocket: Server;

  constructor(httpServer: any, engine: Engine) {
    this.serverSocket = new Server(httpServer);
    this.serverSocket.bind(engine);
  }

  public emitToRoom(room: string, event: string, data: any) {
    this.serverSocket.to(room).emit(event, data);
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

}