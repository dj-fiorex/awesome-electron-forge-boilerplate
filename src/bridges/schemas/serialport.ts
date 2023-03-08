import { Schema } from "@lpfreelance/electron-bridge-cli";
import { LogFunctions } from "electron-log";
import { SerialPortModule } from "../../main/serial";
/**
 * Display native system dialogs for opening and saving files, alerting, etc.
 */
@Schema(true)
export class SerialPort {
  constructor(private log: LogFunctions) {}

  public async refreshSerial(): Promise<string[]> {
    this.log.info("refreshSerial");
    return SerialPortModule.listPorts().then((ports) =>
      ports.map((port) => port.path)
    );
    // return ["COM3", "COM4"];
  }
}
