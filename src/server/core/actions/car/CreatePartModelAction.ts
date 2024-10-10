import { CarPartModel } from "../../domain/car/CarPartModel";
import { CarPartType } from "../../domain/car/CarPartType";
import { CarRepository } from "../../infrastructure/repositories/car/CarRepository";
import { Action } from "../Action";

export interface CreatePartModelActionParams {
  name: string;
  type: CarPartType;
  acceleration: number;
  velocity: number;
  steering: number;
  resistance: number;
}

export class CreatePartModelAction implements Action<CreatePartModelActionParams, CarPartModel> {
  constructor(
    private readonly carRepository: CarRepository
  ) { }

  public execute(params: CreatePartModelActionParams): Promise<CarPartModel> {
    return this.carRepository.createPartModel(params);
  }
}