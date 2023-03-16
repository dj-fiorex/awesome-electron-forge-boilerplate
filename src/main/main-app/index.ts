import Store from "electron-store";
import { StoreType } from "../../store/settings.store";
import { SerialPortModule } from "../serial";
import { Logger, LogFunctions } from "electron-log";
const DELIMITER = [0xaa, 0x3a];

interface IMainApplication {
  start(): void;
  stop(): void;
}

function isConsole(obj: any): obj is Console {
  return obj.scope === undefined;
}

function isElectronLogger(obj: any): obj is Logger {
  return obj.scope !== undefined;
}

export class MainApplication implements IMainApplication {
  private store: Store<StoreType>;

  private baseLog: Logger;

  private logger: LogFunctions | Console;

  private started = false;

  private serial: SerialPortModule;

  constructor(store: Store<StoreType>, logger?: Logger) {
    if (logger) {
      this.baseLog = logger;
    }
    let serialLogger: LogFunctions | Console = null;
    if (this.baseLog && isElectronLogger(this.baseLog)) {
      this.logger = this.baseLog.scope("MAIN-APP");
      serialLogger = this.baseLog.scope("SERIAL");
    } else if (this.baseLog && isConsole(this.baseLog)) {
      this.logger = this.baseLog;
      serialLogger = this.baseLog;
    } else {
      this.logger = console;
      serialLogger = console;
    }
    // Do something
    this.store = store;
    this.serial = new SerialPortModule(null, null, DELIMITER, serialLogger);
  }

  public start() {
    const serialPort = this.store.get("serialPort");
    const serialBaudRate = this.store.get("serialBaudRate");
    const opcuaHost = this.store.get("opcuaHost");
    const opcuaPort = this.store.get("opcuaPort");
    this.logger.info(
      "Starting application",
      this.started,
      serialPort,
      serialBaudRate,
      opcuaHost,
      opcuaPort
    );
    // Do something
    if (this.started) {
      return;
    }
    if (!serialPort || !serialBaudRate) {
      this.logger.error("Serial port or baud rate not set");
      return;
    }
    this.serial.setPort(serialPort);
    this.serial.setBaudRate(serialBaudRate);
    this.serial.start();
    this.started = true;
  }

  public stop(): void {
    // Do something
    if (!this.started) {
      return;
    }
    this.serial.stop();
    this.started = false;
  }
}
