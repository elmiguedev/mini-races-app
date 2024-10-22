import { Car } from "../../domain/car/Car";
import { CarRepository } from "../../infrastructure/repositories/car/CarRepository";
import { Action } from "../Action";

export interface CreateCarActionParams {
  userId: number;
}

export class CreateCarAction implements Action<CreateCarActionParams, Car> {
  constructor(
    private readonly carRepository: CarRepository
  ) { }

  public execute(params: CreateCarActionParams): Promise<Car> {
    const car: Car = {
      color: "black",
      userId: params.userId
    }

    return this.carRepository.createCar(car);
  }
}