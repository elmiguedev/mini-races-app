import { CarRepository } from "./CarRepository";
import { CarPartModel } from "../../../domain/car/CarPartModel";
import prisma from "~~/lib/prisma";
import { CarPart } from "../../../domain/car/CarPart";

export class PrismaCarRepository implements CarRepository {

  public async createPart(part: CarPart): Promise<CarPart> {
    const newPart = await prisma.carPart.create({
      data: {
        userId: part.userId,
        carPartModelId: part.carPartModelId,
        accelerationUpgrade: part.accelerationUpgrade,
        velocityUpgrade: part.velocityUpgrade,
        steeringUpgrade: part.steeringUpgrade,
        resistanceUpgrade: part.resistanceUpgrade
      }
    });
    return newPart as CarPart;
  };

  public async getPartModels(): Promise<CarPartModel[]> {
    const models = await prisma.carPartModel.findMany();
    return models as CarPartModel[];
  }

  public async getPartModelById(id: number): Promise<CarPartModel> {
    const model = await prisma.carPartModel.findFirst({ where: { id } });
    return model as CarPartModel;
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