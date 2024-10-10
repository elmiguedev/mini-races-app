import { CarPartModel } from "../../domain/car/CarPartModel";
import { CarRepository } from "../../infrastructure/repositories/car/CarRepository";
import { Action } from "../Action";

export class GetPartModelsAction implements Action<void, CarPartModel[]> {

  constructor(
    private readonly carRepository: CarRepository
  ) { }

  execute(): Promise<CarPartModel[]> {
    return this.carRepository.getPartModels();
  }

}