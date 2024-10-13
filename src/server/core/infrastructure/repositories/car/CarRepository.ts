import { CarPart } from "../../../domain/car/CarPart";
import { CarPartModel } from "../../../domain/car/CarPartModel";

export interface CarRepository {
  getPartModels: () => Promise<CarPartModel[]>
  getPartModelById: (id: number) => Promise<CarPartModel>
  createPartModel: (model: CarPartModel) => Promise<CarPartModel>
  createPart: (part: CarPart) => Promise<CarPart>
}