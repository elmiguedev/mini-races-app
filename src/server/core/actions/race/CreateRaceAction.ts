import { Action } from "../Action";

export class CreateRaceAction implements Action<void, void> {
  execute(): Promise<void> {
    console.log("COSO")
    return Promise.resolve();
  }
}