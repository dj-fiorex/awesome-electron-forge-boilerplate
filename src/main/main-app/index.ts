import Store from "electron-store";
import { StoreType } from "../../store/settings.store";
import { SerialPortModule } from "../serial";

const DELIMITER = [0x3a, 0xaa];

interface IMainApplication {
  start(): void;
  stop(): void;
}

export class MainApplication implements IMainApplication {
  private store: Store<StoreType>;

  private logger: any;

  private started = false;

  private serial: SerialPortModule;

  constructor(store: Store<StoreType>, logger?: any) {
    if (logger) {
      this.logger = logger;
    } else {
      this.logger = console;
    }
    // Do something
    this.store = store;
    this.serial = new SerialPortModule(null, null, DELIMITER, this.logger);
  }

  public start(): void {
    this.logger.info(
      "Starting application",
      this.started,
      this.store.get("serialPort"),
      this.store.get("serialBaudRate")
    );
    // Do something
    if (this.started) {
      return;
    }
    if (!this.store.get("serialPort") || !this.store.get("serialBaudRate")) {
      this.logger.error("Serial port or baud rate not set");
      return;
    }
    this.serial.setPort(this.store.get("serialPort"));
    this.serial.setBaudRate(this.store.get("serialBaudRate"));
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
