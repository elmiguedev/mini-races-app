import { CarPartModel } from "../../../domain/car/CarPartModel";

export interface CarRepository {
  getPartModels: () => Promise<CarPartModel[]>
  createPartModel: (model: CarPartModel) => Promise<CarPartModel>
}