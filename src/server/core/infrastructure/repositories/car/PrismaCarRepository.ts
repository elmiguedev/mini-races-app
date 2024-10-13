import { CarRepository } from "./CarRepository";
import { CarPartModel } from "../../../domain/car/CarPartModel";
import prisma from "~~/lib/prisma";

export class PrismaCarRepository implements CarRepository {

  public async getPartModels(): Promise<CarPartModel[]> {
    const models = await prisma.carPartModel.findMany();
    return models as CarPartModel[];
  }

  public async createPartModel(model: CarPartModel): Promise<CarPartModel> {
    const newModel = await prisma.carPartModel.create({
      data: {
        name: model.name,
        type: model.type,
        acceleration: model.acceleration,
        velocity: model.velocity,
        steering: model.steering,
        resistance: model.resistance
      }
    });
    return newModel as CarPartModel;
  }

}