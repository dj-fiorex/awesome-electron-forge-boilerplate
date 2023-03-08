import { Schema } from "@lpfreelance/electron-bridge-cli";
import { LogFunctions } from "electron-log";
import { MainApplication } from "../../main/main-app";

@Schema(true)
export class Application {
  constructor(private app: MainApplication, private log: LogFunctions) {}

  public async start(): Promise<boolean> {
    this.log.info("start");
    this.app.start();
    return true;
  }

  public async stop(): Promise<boolean> {
    this.log.info("stop");
    this.app.stop();
    return true;
  }
}
