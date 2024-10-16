import { CarRepository } from "./CarRepository";
import { CarPartModel } from "../../../domain/car/CarPartModel";
import prisma from "~~/lib/prisma";
import { CarPart } from "../../../domain/car/CarPart";
import { Car } from "~/server/core/domain/car/Car";
import { CarSlot } from "~/server/core/domain/car/CarSlot";

export class PrismaCarRepository implements CarRepository {
  public async createCarSlot(slot: CarSlot): Promise<CarSlot> {
    // const newSlot = await prisma.carSlot.create({
    //   data: slot
    // })
  }
  public async getCarSlotsByCarId(carId: number): Promise<CarSlot[]> {

  }
  public async updateCarSlot(slot: CarSlot): Promise<CarSlot> {

  }


  public getCarPartsByUserId(userId: number): Promise<CarPart[]> {
    return prisma.carPart.findMany({
      where: {
        userId
      },
      include: {
        CarPartModel: true
      }
    })
  }

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

  public async getCarById(carId: number): Promise<Car | undefined> {
    const car = await prisma.car.findFirst({
      where: {
        id: carId
      }
    });
    if (car === null) {
      return undefined
    }

    return car;
  }



}