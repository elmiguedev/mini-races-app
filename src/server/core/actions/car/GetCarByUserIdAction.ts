import { Car } from "../../domain/car/Car";
import { CarRepository } from "../../infrastructure/repositories/car/CarRepository";
import { Action } from "../Action";

export class GetCarByUserIdAction implements Action<number, Car[]> {
  constructor(private readonly carRepository: CarRepository) { }
  public async execute(userId: number) {
    return this.carRepository.getCarByUserId(userId);
  }
} 