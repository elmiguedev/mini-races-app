import { CarPart } from "../../domain/car/CarPart";
import { CarRepository } from "../../infrastructure/repositories/car/CarRepository";
import { Action } from "../Action";

export class GetUserCarPartsAction implements Action<number, CarPart[]> {

  constructor(
    private readonly carRepository: CarRepository
  ) { }

  public execute(userId: number): Promise<CarPart[]> {
    return this.carRepository.getCarPartsByUserId(userId);
  }

}