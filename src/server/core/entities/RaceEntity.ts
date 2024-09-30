// const validateCheckpointOverlap = (checkpoints: Checkpoint[], car: Car, race: any, callback: any) => {
//   for (let i = 0; i < checkpoints.length; i++) {
//     if (
//       car.x >= checkpoints[i].x &&
//       car.x <= checkpoints[i].x + checkpoints[i].width &&
//       car.y >= checkpoints[i].y &&
//       car.y <= checkpoints[i].y + checkpoints[i].height
//     ) {
//       const id = checkpoints[i].id;

//       // si el car pasa por el mismo checkpoint que ya esta, no hace nada
//       if (id === car.currentCheckpoint) {
//         return;
//       }

//       // si el car pasa por un checkpoint inmediatamente superior, avanza
//       if (car.currentCheckpoint + 1 === id) {
//         car.currentCheckpoint = id;
//         car.currentCheckpointTime = new Date().getTime();
//         return;
//       }

//       // si el car pasa por un checkpoint inmediatamente inferior, retrocede
//       if (car.currentCheckpoint - 1 === id && id > 0) {
//         car.currentCheckpoint = id;
//         car.currentCheckpointTime = new Date().getTime();
//         return;
//       }

//       // si el car pasa por la meta, y venia con el ultimo check, avanza de lap
//       if (id === 0 && car.currentCheckpoint === checkpoints.length - 1) {
//         car.laps++;
//         car.currentCheckpoint = 0;
//         car.currentCheckpointTime = new Date().getTime();

//         if (car.laps >= race.laps) {
//           car.status = 'finished';
//           race.podium.push(car);
//           if (race.status === "pending") {
//             race.status = "finished"
//           }
//         }

//         // ACA TENEMOS QUE PONER LA CONDICION DE CORTE
//         if (race.podium.length === race.cars.length) {
//           callback();
//         }


//         return;
//       }

//       if (id === 0 && car.currentCheckpoint === 1) {
//         car.laps -= 1;
//         car.currentCheckpoint = checkpoints.length - 1;
//         car.currentCheckpointTime = new Date().getTime();
//         return;
//       }

//       const position = getCheckpointPosition(checkpoints, car.currentCheckpoint);
//       car.x = position.x;
//       car.y = position.y;
//     }
//   }
// }

// const getCheckpointPosition = (checkpoints: Checkpoint[], id: number) => {
//   return {
//     x: checkpoints[id].x,
//     y: checkpoints[id].y
//   }
// }

// const validatePositions = (cars: Car[]) => {
//   cars.sort((a, b) => {
//     return (a.laps - b.laps === 0 ?
//       ((a.currentCheckpoint - b.currentCheckpoint) === 0
//         ? b.currentCheckpointTime - a.currentCheckpointTime
//         : a.currentCheckpoint - b.currentCheckpoint)
//       : a.laps - b.laps);
//   });
//   cars.forEach((car, index) => {
//     car.racePosition = index;
//   });
// }

// const createCar = (id: string, x: number, y: number, world: World) => {
//   const randomColor = Math.floor(Math.random() * 16777215);
//   const carState = {
//     id: id,
//     x: x,
//     y: 430,
//     racePosition: 0,
//     laps: 0,
//     currentCheckpoint: 0,
//     color: randomColor,
//     currentCheckpointTime: 0,
//     status: "pending"
//   };

//   const carBody = world.createBody({
//     type: 'dynamic',
//     position: Vec2(x, y),
//     angle: 0,
//     linearDamping: 0.5
//   });

//   carBody.createFixture({
//     shape: new BoxShape(32, 32),
//   });

//   return {
//     body: carBody,
//     state: carState
//   }

// }

// const moveCar = (car: any, controls: any) => {
//   const { up, left, right } = controls;
//   const carBody: Body = car.body;
//   if (up) {
//     const cosx = Math.cos(carBody.getAngle());
//     const sinx = Math.sin(carBody.getAngle());
//     const acc = 26;
//     carBody.applyLinearImpulse(
//       Vec2(cosx * acc, sinx * acc),
//       carBody.getWorldCenter(),
//     )
//   }

//   if (left) {
//     const currentAngle = carBody.getAngle();
//     carBody.setAngle(currentAngle - 0.05);
//   }

//   if (right) {
//     const currentAngle = carBody.getAngle();
//     carBody.setAngle(currentAngle + 0.05);
//   }
// }

// const createCheckpoints = (): Checkpoint[] => {
//   return [
//     { x: 100, y: 500, width: 170, height: 20, id: 0 },
//     { x: 400, y: 70, width: 20, height: 140, id: 1 },
//     { x: 750, y: 300, width: 170, height: 20, id: 2 },
//     { x: 500, y: 600, width: 140, height: 20, id: 3 },
//     { x: 750, y: 800, width: 170, height: 20, id: 4 },
//     { x: 500, y: 800, width: 20, height: 140, id: 5 }
//   ]
// }

// // const cars: Car[] = [];
// const checkpoints: Checkpoint[] = createCheckpoints();
// const race: any = {
//   laps: 1,
//   podium: [],
//   status: "pending",
//   cars: [],
//   carsLength: 1
// }

// const world: World = new World();